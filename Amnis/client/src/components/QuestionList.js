import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Badge, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import { getLectureQuestions, deleteQuestion, upvoteQuestion, downvoteQuestion, addQuestion } from '../actions/questionActions';
import { getUser, getUserID } from '../UserAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../App.css'

class QuestionList extends Component {
    //uncomment below to integrate 'real-time' question updates
    constructor(props) {
        super(props);
        this.state = { inputQuestion: '',
                       currentUser: getUser(),
                       currentID: getUserID()
                    };
    }

    componentDidMount() {
        this.props.getLectureQuestions(this.props.lectureID);
        var intervalID = setInterval(()=> {this.props.getLectureQuestions(this.props.lectureID)}, 2000);
        this.setState({intervalID: intervalID});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }

    onDeleteClick = (id) => {
        this.props.deleteQuestion(id);
    }

    onUpvoteClick = (id) => {
        this.props.upvoteQuestion(id, this.props.lectureID, true); // second variable is true when get request is desired to be resent after upvote
    }

    onDownvoteClick = (id) => {
        this.props.downvoteQuestion(id, this.props.lectureID, true); // second variable is true when get request is desired to be resent after upvote
    }

    onSubmitClick = (e) => {
        e.preventDefault();

       const newQuestion = {
            content: this.state.inputQuestion,
            score: 0,
            lectureID: this.props.lectureID,
            googleUserID: this.state.currentID
       };
       this.props.addQuestion(newQuestion);
       this.setState({inputQuestion: ''});
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { questions } = this.props.question; 
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        <div className="question-list-wrapper">
                            {questions.map(({ _id, googleUserID, content, upvotes, score }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        {googleUserID === this.state.currentID ? (
                                            <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                                ><FontAwesomeIcon icon="trash"/></Button>
                                        ): (<span>
                                            {!(upvotes.some(ID => ID === this.state.currentID)) ? (
                                            <Button
                                                className="remove-btn"
                                                color="primary"
                                                size="sm"
                                                onClick={this.onUpvoteClick.bind(this, _id)}
                                            ><FontAwesomeIcon icon="arrow-up" /></Button>
                                        ) : (
                                            <Button
                                                className="remove-btn"
                                                color="warning"
                                                size="sm"
                                                onClick={this.onDownvoteClick.bind(this, _id)}
                                            ><FontAwesomeIcon icon="arrow-down" /></Button>
                                        )}
                                        </span>)}
                                        <span className="normalText">{content}</span><span className="score"><Badge color="secondary">{score}</Badge></span>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </div>
                        <InputGroup style={{marginTop: '15px'}}>
                                <Input
                                    type="text"
                                    name="inputQuestion"
                                    value={this.state.inputQuestion}
                                    id="questionDesc"
                                    placeholder="Ask a question here!"
                                    onChange={this.onChange} />
                                <InputGroupAddon addonType="append">
                                        <Button color="success" onClick={this.onSubmitClick.bind(this)} disabled={this.state.inputQuestion === ''}>Add</Button>
                                </InputGroupAddon>
                        </InputGroup>
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

QuestionList.propTypes = {
    getLectureQuestions: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    downvoteQuestion: PropTypes.func.isRequired,
    lectureID: PropTypes.string.isRequired,
    question: PropTypes.object
}

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(
    mapStateToProps, 
    { getLectureQuestions,
      addQuestion,
      deleteQuestion, 
      upvoteQuestion,
      downvoteQuestion })(QuestionList);