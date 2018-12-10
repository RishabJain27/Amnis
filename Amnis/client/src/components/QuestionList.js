// Provides a display for all questions pertaining to a specified lecture.
// Updates dynamically based on database state, and resizes as needed. 
// Displays alongside the lecture Youtube video.

import React, { Component } from "react";

// Redux related components
import { getUser, getUserID } from "../UserAuth";
import { connect } from "react-redux";
import {
  getLectureQuestions,
  deleteQuestion,
  upvoteQuestion,
  downvoteQuestion,
  addQuestion
} from "../actions/questionActions";
import PropTypes from "prop-types";

// Reactstrap, CSS, FontAwesome imports for UI
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Badge,
    Input,
    InputGroup,
    InputGroupAddon
  } from "reactstrap";
  import { CSSTransition, TransitionGroup } from "react-transition-group";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";


class QuestionList extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            inputQuestion: '',      // Stores question form input
            currentUser: getUser(), // Retrieves the current user information
            currentID: getUserID()  // Retrieves the current user's google ID
        };
    }

    // React defined function, runs whenever the component mounts. In this case, retrieves questions from
    // the database.
    componentDidMount() {
        this.props.getLectureQuestions(this.props.lectureID); // Sends a request to retrieve questions asked at this lecture
        var intervalID = setInterval(()=> {this.props.getLectureQuestions(this.props.lectureID)}, 2000);
        this.setState({intervalID: intervalID});
    }

    // React defined function that runs when component will unmount
    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }

    // Sends an action to the reducer to delete a specified question by ID
    onDeleteClick = (id) => {
        this.props.deleteQuestion(id);
    }

     // Sends an action to the reducer to upvote a specified question by ID
    onUpvoteClick = (id) => {
        this.props.upvoteQuestion(id, this.props.lectureID, true); // second variable is true when get request is desired to be resent after upvote
    }

     // Sends an action to the reducer to downvote a specified question by ID
    onDownvoteClick = (id) => {
        this.props.downvoteQuestion(id, this.props.lectureID, true); // second variable is true when get request is desired to be resent after upvote
    }

     // Sends an action to the reducer to add a new question to the given lecture 
    onSubmitClick = (e) => {
        e.preventDefault();
        // Filling out a new question object with the schema fields filled out
        const newQuestion = {
            content: this.state.inputQuestion,
            score: 0,
            lectureID: this.props.lectureID,
            googleUserID: this.state.currentID
        };
        // Send the POST request to the database and reset the input field
        this.props.addQuestion(newQuestion);
        this.setState({ inputQuestion: '' });
    }

    // Updates the state whenever the question field is edited
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { questions } = this.props.question; // stores the questions in an array
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        <div className="question-list-wrapper">
                            {/* Map each question to be displayed in the component */}
                            {questions.map(({ _id, googleUserID, content, upvotes, score }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem> 
                                        {/* If user created the question, they can delete their question and are 
                                        unable to upvote it. */}
                                        {googleUserID === this.state.currentID ? (
                                            <Button
                                                className="remove-btn"
                                                color="danger"
                                                size="sm"
                                                onClick={this.onDeleteClick.bind(this, _id)}
                                                ><FontAwesomeIcon icon="trash"/></Button>
                                            ) : (<span>
                                                {!(upvotes.some(ID => ID === this.state.currentID)) ? (
                                                    <Button
                                                        className="remove-btn"
                                                        color="primary"
                                                        size="sm"
                                                        onClick={this.onUpvoteClick.bind(this, _id)}>
                                                        <FontAwesomeIcon icon="arrow-up" />
                                                    </Button>
                                                ) : (
                                                        <Button
                                                            className="remove-btn"
                                                            color="warning"
                                                            size="sm"
                                                            onClick={this.onDownvoteClick.bind(this, _id)}>
                                                            <FontAwesomeIcon icon="arrow-down" />
                                                        </Button>
                                                    )}
                                                </span>)
                                        }
                                        <span className="normalText">{content} {content.length <= 48 && content.length >= 46 && (<span>&nbsp;&nbsp;</span>)}</span><span className="score"><Badge color="secondary">{score}</Badge></span>
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </div>
                        {/* Question input form */}
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

// Specification of QuestionList component property types for usage with Redux
QuestionList.propTypes = {
    getLectureQuestions: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    downvoteQuestion: PropTypes.func.isRequired,
    lectureID: PropTypes.string.isRequired,
    question: PropTypes.object
}

// Mapping state into component properties from Redux
const mapStateToProps = (state) => ({
    question: state.question
});

// Connecting the Redux components together
export default connect(
    mapStateToProps, 
    { getLectureQuestions,
      addQuestion,
      deleteQuestion, 
      upvoteQuestion,
      downvoteQuestion })(QuestionList);