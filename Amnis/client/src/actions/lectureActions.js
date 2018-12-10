import axios from 'axios';
import { GET_LECTURES, ADD_LECTURE, CHECK_LECTURE, CHANGE_STREAM } from './types';
import { serverURL, clientURL } from '../components/ServerRoutes';

// Dispatches a GET request to the database to retrieve all lectures,
// then updates the global store.
export const getLectures = () => dispatch => {
    axios
        .get(`${serverURL}lectures`)
        .then(res => 
            dispatch({
                type: GET_LECTURES,
                payload: res.data
            })
        );
};

// Dispatches a GET request to the database to retrieve a lecture by ID,
// then updates the global store.
export const checkLecture = (id) => dispatch => {
    axios
        .get(`${serverURL}/lectures/${id}`)
        .then(res => 
            dispatch({
                type: CHECK_LECTURE,
                payload: res.data
            })
        );
};

// Dispatches a PUT request to the database to change a lecture's stream status by ID,
// then updates the global store.
export const changeLectureStream = (id) => dispatch => {
    axios
        .put(`${serverURL}/lectures/toggleStream/${id}`)
        .then(res => 
            dispatch({
                type: CHANGE_STREAM,
                payload: res.data
            })
        );
};

// Dispatches a POST request to the database to add a new lecture,
// then updates the global store.
export const addLecture = (lecture, history) => dispatch => {
    axios
        .post(`${serverURL}/lectures`, lecture)
        .then(res => {
             dispatch({
                type: ADD_LECTURE,
                payload: res.data
            });
            if(history) {
                window.location.href=`${clientURL}lecture/${res.data._id}`
            }
        })
        .catch((err) => {console.log(err);});
};