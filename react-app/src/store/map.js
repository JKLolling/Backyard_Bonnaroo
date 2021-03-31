const SET_CENTER = 'map/SetCenter';

export const mapSetCenter = (center) => {
	return {
		type: SET_CENTER,
    center
	};
};


const initialState = {
  center: {
    lat: 40.7675,
    lng: -73.9758
  },
  zoom: 15,
};

const mapReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_CENTER:
			newState = Object.assign({}, state, { center: {...action.center} });
			return newState;
		default:
			return state;
	}
};

export default mapReducer;
