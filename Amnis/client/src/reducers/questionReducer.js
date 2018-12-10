// A Redux reducer to be used with all question related functions

// Import all actions relating to questions
import {
  GET_QUESTIONS,
  ADD_QUESTION,
  DELETE_QUESTION,
  QUESTIONS_LOADING,
  UPVOTE_QUESTION,
  GET_LECTURE_Q
} from "../actions/types";

const initialState = {
  questions: [],
  loading: false
};

// Switch statement to update store based on the given action
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS: // Action where all questions need to be retrieved from database
            return {
                ...state,
                questions: action.payload,
                loading: false
            };
        case GET_LECTURE_Q: // Action to retrieve all questions pertaining to a specific lecture
            return {
                ...state,
                questions: action.payload,
                loading: false
            };
        case DELETE_QUESTION: // Action to delete a question by ID
            return {
                ...state,
                questions: state.questions.filter(question => question._id !== action.payload)
            };
        case ADD_QUESTION:  // Action to add a new question to the database
            return {
                ...state,
                questions: [...state.questions, action.payload]
            };
        case QUESTIONS_LOADING: // Action to set the questions to loading
            return {
                ...state,
                loading: true
            };
        case UPVOTE_QUESTION: // Action to upvote a question
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