const SET_CENTER = 'map/SetCenter';
const SET_DATE ='map/SetDate'

export const mapSetCenter = (center) => {
	return {
		type: SET_CENTER,
    center
	};
};

export const mapSetDate = (date) => {
  return {
    type: SET_DATE,
    date
  }
}

const initialState = {
  center: {
    lat: 40.7675,
    lng: -73.9758
  },
  zoom: 15,
  date: null,
};

const mapReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_CENTER:
			newState = Object.assign({}, state, { center: {...action.center} });
			return newState;
    case SET_DATE:
      newState = Object.assign({}, state, {date: action.date})
      return newState
		default:
			return state;
	}
};

export default mapReducer;
