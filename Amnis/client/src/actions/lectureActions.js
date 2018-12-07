import axios from 'axios';
import { GET_LECTURES, ADD_LECTURE, CHECK_LECTURE } from './types';

export const getLectures = () => dispatch => {
    axios
        .get('http://localhost:5000/api/lectures')
        .then(res => 
            dispatch({
                type: GET_LECTURES,
                payload: res.data
            })
        );
};

export const checkLecture = (id) => dispatch => {
    axios
        .get(`http://localhost:5000/api/lectures/${id}`)
        .then(res => 
            dispatch({
                type: CHECK_LECTURE,
                payload: res.data
            })
        );
};

export const addLecture = (lecture, history) => dispatch => {
    axios
        .post('http://localhost:5000/api/lectures', lecture)
        .then(res => {
             dispatch({
                type: ADD_LECTURE,
                payload: res.data
            });
            if(history) {
                window.location.href=`http://localhost:3000/lecture/${res.data._id}`
            }
        })
        .catch((err) => {console.log(err);});
};