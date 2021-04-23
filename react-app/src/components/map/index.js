import React, { useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import GoogleMapReact from 'google-map-react';
import {mapSetCenter, mapSetDate} from '../../store/map'

import ShowPin from '../show_pin'
import ShowCard from '../show_card'

import {mapSetSearched} from '../../store/map'

//styling
import c from './Map.module.css'

const {REACT_APP_API_KEY_GOOGLE_MAPS} = process.env

function Map(){
  const [shows, setShows] = useState([])
  // const [params, setParams] = useState(useParams().mapParams)

  const dispatch = useDispatch()
  const storeMapData = useSelector(store => store.map)
  let params = useParams().mapParams


  // Get the shows in the area
  useEffect(() => {
    if (!storeMapData?.center) return;

    (async() => {
      const res = await fetch('/api/shows/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(storeMapData)
      })
      const data = await res.json()

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

  // Get the map coords and date from the params and update the store params and date
  useEffect(() => {

    if (!storeMapData?.searched){
      return
    }
    (async() => {

      const urlParams = new URLSearchParams(params)
      const address = urlParams.get('address')
      const date = urlParams.get('date')
      if (date){
        dispatch(mapSetDate(date))
      }

      // const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${REACT_APP_API_KEY_GOOGLE_MAPS}`)
      let searchParams = new URLSearchParams(address);
      searchParams.append('key', REACT_APP_API_KEY_GOOGLE_MAPS)
      searchParams = `address=${searchParams.toString()}`

      let url = `https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`

      try {
        const res = await fetch(url)
        const data = await res.json()
        const {lat, lng} = data.results[0].geometry.location
        dispatch(mapSetCenter({lat, lng}))
      } catch (error) {
        console.log('Cannot find the address provided')
      }
    })();
  }, [dispatch, params, storeMapData]);

  // Center the map around the map coords in the store on the very first load
  const apiIsLoaded = (map, maps) => {
    if (map) {
      map.setCenter(storeMapData.center)
      map.setZoom(storeMapData.zoom)
    }
  };

  const updateStoreCoords = (e) => {
    if (storeMapData.searched){
      dispatch(mapSetSearched(false))
    } else {
      const {lat, lng} = e.center
      dispatch(mapSetCenter({lat, lng}))
    }
  }

  return (
      <div className={c.page_container}>
        <div className={c.page_content}>
          <div className={c.results_container}>
            {shows.map(show => (
              <ShowCard
                key={show.address + show.date}
                info={show}
              />
            ))}
          </div>
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
                show_data={show}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
  )
}

export default Map
