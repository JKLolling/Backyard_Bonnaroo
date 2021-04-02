import React, { useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import GoogleMapReact from 'google-map-react';
import {mapSetCenter} from '../../store/map'

//styling
import c from './Map.module.css'

const {REACT_APP_API_KEY_GOOGLE_MAPS} = process.env

const AnyName = ({ text }) => <div>{text}</div>;

function Map(){
  const dispatch = useDispatch()
  const storeMapData = useSelector(store => store.map)
  const params = useParams().mapParams


  useEffect(() => {
    (async() => {
      const res = await fetch('/api/shows')
      const data = await res.json()
      console.log(data)
    })()
  })

  useEffect(() => {
    (async() => {

      // const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${REACT_APP_API_KEY_GOOGLE_MAPS}`)
      let searchParams = new URLSearchParams(params);
      searchParams.append('key', REACT_APP_API_KEY_GOOGLE_MAPS)
      searchParams = searchParams.toString()

      let url = `https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`

      const res = await fetch(url)
      const data = await res.json()
      const {lat, lng} = data.results[0].geometry.location

      dispatch(mapSetCenter({lat, lng}))
    })();
  }, [dispatch, params]);


  const apiIsLoaded = (map, maps) => {
    if (map) {
      map.setCenter(storeMapData.center)
      map.setZoom(storeMapData.zoom)
    }
  };

  return (
      <div className={c.page_container}>
        <div className={c.page_content}>
          <div className={c.results_container}>Results</div>
          <div style={{ height: '100%', width: '60%' }} className={c.map}>
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
        </div>
      </div>
  )
}

export default Map
