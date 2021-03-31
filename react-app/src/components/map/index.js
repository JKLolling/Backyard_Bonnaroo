import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
// import { URL, URLSearchParams } from 'url';

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

  useEffect(() => {
    (async() => {

      let searchParams = new URLSearchParams();
      searchParams.append('address', "270 Monarch Lane Austin")
      searchParams.append('key', REACT_APP_API_KEY_GOOGLE_MAPS)
      searchParams = searchParams.toString()

      let url = `https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`

      // const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${REACT_APP_API_KEY_GOOGLE_MAPS}`)

      const res = await fetch(url)

      const data = await res.json()
      const {lat, lng} = data.results[0].geometry.location
      console.log(data, lat, lng)
    })();
  }, []);

  return (
      <div style={{ height: '90vh', width: '70%' }}>
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
