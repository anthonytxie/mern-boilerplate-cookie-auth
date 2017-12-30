import { FETCH_USER, CREATE_USER, AUTH_ERROR } from '../actions/types.js';

const defaultAuthState = {
  user: null,
  authError: false,
};

export default function(state = defaultAuthState, action) {
  switch (action.type) {
    case FETCH_USER:
      return (
        { user: action.payload, authError: false } || {
          user: false,
          authError: true,
        }
      );
    case CREATE_USER:
      return (
        { user: action.payload, authError: false } || {
          user: false,
          authError: true,
        }
      );
    case AUTH_ERROR:
      return (
        { user: false, authError: action.payload } || {
          user: false,
          authError: true,
        }
      );
    default:
      return state;
  }
}
