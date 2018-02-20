import {user as userReducer, isAdmin, getApiKey, getEmail, getFetched, getName, getRoles, getUserName, isUserLoggedIn} from './main';

export default userReducer;

export {
    getUserName,
    getRoles,
    getName,
    getEmail,
    getFetched,
    getApiKey,
    isAdmin,
    isUserLoggedIn
};
