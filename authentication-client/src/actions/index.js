import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3090/signup', formProps);

        dispatch({ type: AUTH_USER, payload: response.data.token });
        // web browser has a feature called local storage, storing the token there so user wont loose token if page is refreshed
        // Its kind of undecided in the web community as to whether or not the local storage is truly a secured location
        // in theory, if someone manages to execute a cross scripting attack on your website,
        // they can possibly pull the web token from the storage and use it to impersonate that user
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

// signout action creator, excellent to remember
export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    };
};

export const signin = (formProps, callback) => async (dispatch) => {
    try {
        console.log(formProps);
        const response = await axios.post('http://localhost:3090/signin', formProps);
        console.log(response);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        // web browser has a feature called local storage, used to save data so that you wont loose when a user refreshes the page
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};
