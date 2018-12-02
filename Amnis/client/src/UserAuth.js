export const isUserLoggedIn = () => {
   return (localStorage.getItem('currentUser') !== null);
};

export const getUser = () => {
    return localStorage.getItem('currentUser');
};

export const isUserProfessor = () => {
    return (localStorage.getItem('isProfessor') === 'true');
};

export const logoutUser = () => {
    return localStorage.clear();
}