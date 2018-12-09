import axios from 'axios';
import { getUserID } from '../UserAuth';
import { GET_QUESTIONS, GET_LECTURE_Q, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING } from './types';

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

export const getLectureQuestions = (id) => dispatch => {
    axios
        .get(`http://localhost:5000/api/questions/findLecture/${id}`)
        .then(res => 
            dispatch({
                type: GET_LECTURE_Q,
                payload: res.data
            })
        );
};

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

export const upvoteQuestion = (id, lectureID, reload) => dispatch => {
    const currentUserID = {
        googleID: getUserID()
    };
    axios
        .put(`http://localhost:5000/api/questions/upvote/${id}`, currentUserID)
        .then(res => {
            if (reload === true) {
                dispatch(getLectureQuestions(lectureID));
            }
        });
};

export const downvoteQuestion = (id, lectureID, reload) => dispatch => {
    const currentUserID = {
        googleID: getUserID()
    };
    axios
        .put(`http://localhost:5000/api/questions/downvote/${id}`, currentUserID)
        .then(res => {
            if (reload === true) {
                dispatch(getLectureQuestions(lectureID));
            }
        });
};


export const setQuestionsLoading = () => {
    return {
        type: QUESTIONS_LOADING
    };
};