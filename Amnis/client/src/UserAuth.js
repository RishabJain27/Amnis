export const isUserLoggedIn = () => {
   return (localStorage.getItem('currentUser') !== null);
};

export const getUser = () => {
    return localStorage.getItem('currentUser');
};

export const getUserID = () => {
    return localStorage.getItem('currentGoogleID');
};

export const isUserProfessor = () => {
    return (localStorage.getItem('isProfessor') === 'true');
};

export const logoutUser = () => {
    return localStorage.clear();
}