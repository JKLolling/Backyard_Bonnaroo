const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

// actions
export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  }
};

export const removeUser = () => ({
  type: REMOVE_USER,
});


const initialState = { user: null };


export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
