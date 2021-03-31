import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import GoogleMapReact from 'google-map-react';
import {mapSetCenter} from '../../store/map'

const {REACT_APP_API_KEY_GOOGLE_MAPS} = process.env

const AnyName = ({ text }) => <div>{text}</div>;

function Map(){
  const dispatch = useDispatch()
  const storeMapData = useSelector(store => store.map)


  useEffect(() => {
    (async() => {

      // const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${REACT_APP_API_KEY_GOOGLE_MAPS}`)
      let searchParams = new URLSearchParams();
      searchParams.append('address', "270 Monarch Lane Austin")
      searchParams.append('key', REACT_APP_API_KEY_GOOGLE_MAPS)
      searchParams = searchParams.toString()

      let url = `https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`

      const res = await fetch(url)
      const data = await res.json()
      const {lat, lng} = data.results[0].geometry.location
      // const newLat = lat
      // const newLng = lng
      // console.log(data, lat, lng)
      dispatch(mapSetCenter({lat, lng}))
      // console.log(mapRef.current.props.center)
    })();
  }, [dispatch]);


  const apiIsLoaded = (map, maps) => {
    if (map) {
      map.setCenter(storeMapData.center)
      map.setZoom(storeMapData.zoom)
    }
  };

  return (
      <div style={{ height: '90vh', width: '70%' }}>
        <div>
          {storeMapData.center.lat}
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: REACT_APP_API_KEY_GOOGLE_MAPS  }}
          center={storeMapData.center}
          zoom={storeMapData.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
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
