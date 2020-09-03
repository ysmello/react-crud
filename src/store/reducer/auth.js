const INITIAL_STATE = {};

export default function userAuth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ASYNC_GET_AUTH':
      return action.payload.user;
    default:
      return state;
  }
}
