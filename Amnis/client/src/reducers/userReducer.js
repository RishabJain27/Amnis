// A Redux reducer to be used with all user related functions

import { GET_USER } from '../actions/types';

const initialState = {
    currentUser: ''
};

// Switch statement to update store based on given action (in this case only one)
export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USER: 
            return {
                ...state
            };
        default:
            return state;
    }
};