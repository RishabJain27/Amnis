import { GET_LECTURES, POST_LECTURES } from '../actions/types';

const initialState = {
    currentLecture: '',
    lectures: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_LECTURES: 
            return {
                ...state,
                lectures: action.payload
            };
         case POST_LECTURES:
            return {
                ...state,
                lectures: [action.payload, ...state.lectures]
            };
        default:
            return state;
    }
};