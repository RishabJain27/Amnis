import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { connect } from "react-redux";
import { getQuestions, deleteQuestion } from '../actions/questionActions';
import PropTypes from 'prop-types';

class QuestionList extends Component {
   componentDidMount() {
        this.props.getQuestions();
   }

   onDeleteClick = (id) => {
        this.props.deleteQuestion(id);
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
      deleteQuestion })(QuestionList);