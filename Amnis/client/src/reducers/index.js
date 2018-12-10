// RootReducer that combines all the Redux reducers into one main reducer
// to be used with the global store

import { combineReducers } from 'redux';
import questionReducer from './questionReducer';
import lectureReducer from './lectureReducer';

// Combination of reducers
export default combineReducers({
    question: questionReducer,
    lecture: lectureReducer
});