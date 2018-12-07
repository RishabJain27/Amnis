//Makes databse calls for questions on disucssion board
import axios from 'axios';
import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING, UPVOTE_QUESTION } from './types';

//GET call
export const getQuestions = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios
        .get('http://localhost:5000/api/questions')
        .then(res => 
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data
            })
        );
};

//POST call
export const addQuestion = (question) => dispatch => {
    axios
        .post('http://localhost:5000/api/questions', question)
        .then(res =>
            dispatch({
                type: ADD_QUESTION,
                payload: res.data
            })
        );
};

//DELETE call
export const deleteQuestion = (id) => dispatch => {
    axios
        .delete(`http://localhost:5000/api/questions/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_QUESTION,
                payload: id
            })
        );
};

//PUT call
//changes score of a question
export const upvoteQuestion = (id, reload) => dispatch => {
    axios
        .put(`http://localhost:5000/api/questions/${id}`)
        .then(res =>
            dispatch({
                type: UPVOTE_QUESTION,
                payload: id
            })
        ).then(() => {
            if(reload === true) {
                dispatch(getQuestions());
            }
        });
};

//Doesn't change the database
export const setQuestionsLoading = () => {
    return {
        type: QUESTIONS_LOADING
    };
};