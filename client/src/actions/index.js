import axios from 'axios';
import { FETCH_USER, AUTH_ERROR, CREATE_USER } from './types.js';

// we return a function in the action creator with reduxThunk
// the middleware inspects the value returned from value createStore
//
export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: false });
  }
};

export const createUser = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/signup', { email, password });
    dispatch({ type: CREATE_USER, payload: res.data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: false });
  }
};

export const loginUser = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    dispatch({ type: CREATE_USER, payload: res.data });
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: false });
  }
};
