import React, { useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import GoogleMapReact from 'google-map-react';
import {mapSetCenter} from '../../store/map'

import ShowPin from '../show_pin'

//styling
import c from './Map.module.css'

const {REACT_APP_API_KEY_GOOGLE_MAPS} = process.env

function Map(){
  const [shows, setShows] = useState([])

  const dispatch = useDispatch()
  const storeMapData = useSelector(store => store.map)
  const params = useParams().mapParams


  // Get the shows in the area
  useEffect(() => {
    if (!storeMapData?.center) return;

    (async() => {
      const res = await fetch('/api/shows/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(storeMapData.center)
      })
      const data = await res.json()
      // setShows(data.shows)

      // This prevents multiple pins from being on the same spot
      const visited = new Set()
      const no_duplicate_addresses = []
      data.shows.forEach(show => {
        if (!visited.has(show.address)){
          visited.add(show.address)
          no_duplicate_addresses.push(show)
        }
      });
      setShows(no_duplicate_addresses)
    })()

  }, [storeMapData])

  // Get the map coords for the address and set the redux store with the map coords
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

  // Center the map around the map coords in the store on the very first load
  const apiIsLoaded = (map, maps) => {
    if (map) {
      map.setCenter(storeMapData.center)
      map.setZoom(storeMapData.zoom)
    }
  };

  const updateStoreCoords = (e) => {
    const {lat, lng} = e.center

    // console.log(e.center, e.zoom)
    // Not sure if I should include this. Probably not
    // const latDiff = Math.abs(storeMapData.center.lat - lat)
    // const lngDiff = Math.abs(storeMapData.center.lng - lng)

    // console.log(latDiff > 0.01, lngDiff > 0.01)
    // if (latDiff > 0.01 || lngDiff > 0.01){
    // }
    dispatch(mapSetCenter({lat, lng}))
  }

  return (
      <div className={c.page_container}>
        <div className={c.page_content}>
          <div className={c.results_container}>Results</div>
          <div style={{ height: '100%', width: '60%' }} className={c.map}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: REACT_APP_API_KEY_GOOGLE_MAPS  }}
              center={storeMapData.center}
              zoom={storeMapData.zoom}
              onChange={updateStoreCoords}
              hoverDistance={25}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            >
              {shows.map(show => (
                <ShowPin
                  key={show.address+show.date}
                  lat={show.location_lat}
                  lng={show.location_lng}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
  )
}

export default Map
