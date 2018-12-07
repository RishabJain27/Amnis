import { GET_QUESTIONS, ADD_QUESTION, DELETE_QUESTION, QUESTIONS_LOADING, UPVOTE_QUESTION } from '../actions/types';

const initialState = {
    questions: [],
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS: 
            return {
                ...state,
                questions: action.payload,
                loading: false
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== action.payload)
            };
        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload]
            };
        case QUESTIONS_LOADING:
            return {
                ...state,
                loading: true
            };
        case UPVOTE_QUESTION:
            var indexID = state.questions.findIndex(i => i._id === action.payload);
            var newQuestion = state.questions[indexID];
            newQuestion.score++;
            return {
                ...state,
                questions: [...state.questions.slice(0,indexID), newQuestion, ...state.questions.slice(indexID)]
            }
        default:
            return state;
    }
};