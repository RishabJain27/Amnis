import { GET_LECTURES, ADD_LECTURE, CHECK_LECTURE } from '../actions/types';

const initialState = {
    lectures: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LECTURES: 
            return {
                ...state,
                lectures: action.payload
            };
        case CHECK_LECTURE:
            return {
                ...state,
                lectures: action.payload
            };
        case ADD_LECTURE: 
            return {
                ...state,
                lectures: [action.payload, ...state.lectures]
            };
        default:
            return state;
    }
};