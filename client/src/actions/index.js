import axios from 'axios';
import { FETCH_USER } from './types.js';

// we return a function in the action creator with reduxThunk
// the middleware inspects the value returned from value createStore
//
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};
