import { combineReducers } from 'redux';
import questionReducer from './questionReducer';
import lectureReducer from './lectureReducer';

export default combineReducers({
    question: questionReducer,
    lecture: lectureReducer
});