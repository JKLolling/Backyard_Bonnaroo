const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const MAKE_RESERVATION = 'session/MAKE_RESERVATIONS'
// const REMOVE_SHOW = 'session/REMOVE_SHOWS'

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


// const makeReservation = (show) => {
//   return {
//     type: MAKE_RESERVATION,
//     show
//   }
// }
// export const removeReservation = (show) => {
//   return {
//     type: REMOVE_SHOW,
//     show
//   }
// }

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
  console.log(user_id, show_data)
  const res = await fetch(`/api/users/${user_id}/reservations`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(show_data)
  })
  const user = await res.json()
  // dispatch(setReservations(user.revervations))
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
    case MAKE_RESERVATION:
      let old_reservations = state.user.reservations
      let new_reservations = [...old_reservations, action.show]
      console.log(new_reservations)
      // newState = Object.assign({}, state, {user[reservations]: new_reservations);
			return state
    default:
      return state;
  }
}
