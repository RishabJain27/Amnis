import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import { getQuestions, deleteQuestion, upvoteQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';

class QuestionList extends Component {
    //uncomment below to integrate 'real-time' question updates

    componentDidMount() {
        this.props.getQuestions();
        /*var intervalID = setInterval(()=> {this.props.getQuestions()}, 2000);
        this.setState({intervalID: intervalID});*/
    }

    componentWillUnmount() {
        //clearInterval(this.state.intervalID);
    }

    onDeleteClick = (id) => {
        this.props.deleteQuestion(id);
    }

    onUpvoteClick = (id) => {
        this.props.upvoteQuestion(id);
    }

    render() {
        const { questions } = this.props.question; 
        return(
            <Container style={{marginBottom:'5rem'}}>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {questions.map(({ _id, content, score }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button>
                                     <Button
                                        className="remove-btn"
                                        color="primary"
                                        size="sm"
                                        onClick={this.onUpvoteClick.bind(this, _id)}
                                    >Upvote</Button>
                                    {content} <span className="score">{score}</span>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

QuestionList.propTypes = {
    getQuestions: PropTypes.func.isRequired,
    question: PropTypes.object
}

const mapStateToProps = (state) => ({
    question: state.question
});

export default connect(
    mapStateToProps, 
    { getQuestions,
      deleteQuestion, 
      upvoteQuestion })(QuestionList);