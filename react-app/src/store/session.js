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

export const asyncSetReview = (artist_id, user_id, show_id, rating) => async dispatch => {
  let res = await fetch( `/api/artists/${artist_id}/reviews`,{
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({
      rating,
      user_id,
      show_id,
    })
  })
  let user = await res.json()
  dispatch(setUser(user))
}

export const asyncMakeReservation = (show_id, user_id) => async dispatch => {
  const res = await fetch(`/api/users/${user_id}/reservations`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(show_id)
  })
  const user = await res.json()
  dispatch(setUser(user))
}

export const asyncRemoveShow = (show_data, user_id) => async dispatch => {
  const res = await fetch(`/api/users/${user_id}/reservations`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(show_data)
  })
  const user = await res.json()
  dispatch(setUser(user))
}

const initialState = {
  user: null,
};


export default function sessionReducer(state = initialState, action) {
  // let newState = {}
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
