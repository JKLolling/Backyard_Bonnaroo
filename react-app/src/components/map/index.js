import React from 'react'
import GoogleMapReact from 'google-map-react';

const {REACT_APP_API_KEY_GOOGLE_MAPS} = process.env

const defaultProps = {
  center: {
    lat: 40.7675,
    lng: -73.9758
  },
  zoom: 15
}

const AnyName = ({ text }) => <div>{text}</div>;

function Map(){
  return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_API_KEY_GOOGLE_MAPS  }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyName
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
  )
}

export default Map
