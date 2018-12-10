// A Redux reducer to be used with all lecture related functions

// Import all actions relating to lectures
import { GET_LECTURES, ADD_LECTURE, CHECK_LECTURE } from '../actions/types';

const initialState = {
    lectures: []
};

// Switch statement to update store based on the given action
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LECTURES: // Action where all lectures are retrieved from database
            return {
                ...state,
                lectures: action.payload
            };
        case CHECK_LECTURE: // Action to get a specific lecture by ID from DB
            return {
                ...state,
                lectures: action.payload
            };
        case ADD_LECTURE: // Action to add a new lecture to the DB
            return {
                ...state,
                lectures: [action.payload, ...state.lectures]
            };
        default:
            return state;
    }
};