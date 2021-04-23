import React from 'react'
import {useHistory} from 'react-router-dom'

//Components
import Stars from '../stars'

//Styling
import c from './HotArtists.module.css'

const ArtistCard = ({artist}) =>{
  const history = useHistory()

  const goToShow= async (e) => {
    let searchParams = new URLSearchParams();

    let res = await fetch(`/api/artists/${artist.id}`)
    let shows = await res.json()
    shows = shows.shows
    const first_show = shows[0]

    searchParams.append('address', first_show.address)
    searchParams.append('date', first_show.date)
    searchParams = searchParams.toString()

    // Enable side scrolling when mouse moves away
    window.onscroll = () => {};

    // dispatch(mapSetSearched(true))
    history.push(`/map/${searchParams}`)
}


  return (
    <div
    className={c.artist_card}
    onClick={goToShow}
    value={artist}
  >
    <div className={c.image_container} style={{backgroundImage: `url(${artist.banner_URL})`}}>
      <img className={c.band_photo} src={artist.banner_URL} alt='the band'></img>
    </div>
    <div className={c.artist_name}>
      {artist.name}
    </div>
    <div>
      <Stars rating={artist.rating}></Stars>
    </div>
  </div>
  )
}


export default ArtistCard
