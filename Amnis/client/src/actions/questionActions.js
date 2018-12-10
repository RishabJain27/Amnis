// File to 'interpret' actions for questions based on the given action type (specified in types.js)

import axios from "axios";
import { getUserID } from "../UserAuth";
import {
  GET_QUESTIONS,
  GET_LECTURE_Q,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING
} from "./types";
import { serverURL } from '../components/ServerRoutes'

// Dispatches a GET request to the database to retrieve all questions,
// then updates the global store
export const getQuestions = () => dispatch => {
    dispatch(setQuestionsLoading());
    axios
        .get(`${serverURL}questions`)
        .then(res =>
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data
            })
        );
};

// Dispatches a GET request to the database to retrieve all questions pertaining to a specific lecture,
// then updates the global store
export const getLectureQuestions = (id) => dispatch => {
    axios
        .get(`${serverURL}questions/findLecture/${id}`)
        .then(res =>
            dispatch({
                type: GET_LECTURE_Q,
                payload: res.data
            })
        );
};

// Dispatches a POST request to the database to add a new question,
// then updates the global store.
export const addQuestion = (question) => dispatch => {
    axios
        .post(`${serverURL}questions`, question)
        .then(res =>
            dispatch({
                type: ADD_QUESTION,
                payload: res.data
            })
        );
};

// Dispatches a DELETE request to the database to delet a question by ID,
// then updates the global store.
export const deleteQuestion = (id) => dispatch => {
    axios
        .delete(`${serverURL}questions/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_QUESTION,
                payload: id
            })
        );
};

// Dispatches a PUT request to the database to upvote a question,
// then updates the global store.
export const upvoteQuestion = (id, lectureID, reload) => dispatch => {
    const currentUserID = {
        googleID: getUserID()
    };
    axios
        .put(`${serverURL}questions/upvote/${id}`, currentUserID)
        .then(res => {
            if (reload === true) {
                dispatch(getLectureQuestions(lectureID));
            }
        });
};

// Dispatches a PUT request to the database to downvote a question,
// then updates the global store.
export const downvoteQuestion = (id, lectureID, reload) => dispatch => {
    const currentUserID = {
        googleID: getUserID()
    };
    axios
        .put(`${serverURL}questions/downvote/${id}`, currentUserID)
        .then(res => {
            if (reload === true) {
                dispatch(getLectureQuestions(lectureID));
            }
        });
};

// Sets a boolean to determine if questions are being loaded from database
export const setQuestionsLoading = () => {
    return {
        type: QUESTIONS_LOADING
    };
};