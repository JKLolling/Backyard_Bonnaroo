const SET_CENTER = 'map/SetCenter';
const SET_DATE ='map/SetDate'
const SEARCHED = 'map/Searched'

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

export const mapSetSearched= (bool) => {
  return {
    type: SEARCHED,
    bool
  }
}

const initialState = {
  center: {
    lat: 40.7675,
    lng: -73.9758
  },
  zoom: 15,
  date: null,
  searched: false,
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
    case SEARCHED:
      newState = Object.assign({}, state, {searched: action.bool})
      return newState
		default:
			return state;
	}
};

export default mapReducer;
