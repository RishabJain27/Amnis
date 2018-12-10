// This file provides all user checking and information retrieval functionality, to
// be used by main React components.

// Checks if user is currently logged in. Returns true if logged in, false otherwise
export const isUserLoggedIn = () => {
   return (localStorage.getItem('currentUser') !== null);
};

// Retrieves the information of the current user signed in, if any
export const getUser = () => {
    return localStorage.getItem('currentUser');
};

// Retrieves specifically the googleUserID of the current signed in user, if any
export const getUserID = () => {
    return localStorage.getItem('currentGoogleID');
};

// Returns true if the current user is a professor, false otherwise
export const isUserProfessor = () => {
    return (localStorage.getItem('isProfessor') === 'true');
};

// Logs out the user from the site
export const logoutUser = () => {
    return localStorage.clear();
}