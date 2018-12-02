import axios from 'axios';
import { GET_LECTURES, POST_LECTURES } from './types';

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

export const postLectures = (lecture) => dispatch => {
    axios
        .post('http://localhost:5000/api/lectures', lecture)
        .then(console.log("in post:" + lecture))
        .then(res =>
            dispatch({
                type: POST_LECTURES,
                payload: res.data
            })
        );
};
