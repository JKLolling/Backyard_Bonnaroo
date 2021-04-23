import React, { useEffect, useRef, useState } from 'react'
import {useHistory} from 'react-router-dom'


//Components
import ArtistCard from '../hot_artists'

// Styling
import c from './Home.module.css'

const HomePage = () => {

  const [hotArtists, setHotArtists] = useState([])

  const artistsRef = useRef()

  const history = useHistory()
  const enterPressed = (e) => {
    const keyCode = e.keyCode || e.which
    if (keyCode === 13){
      let searchParams = new URLSearchParams();
      searchParams.append('address', e.target.value)
      // searchParams.append('key', REACT_APP_API_KEY_GOOGLE_MAPS)
      searchParams = searchParams.toString()

      history.push(`/map/${searchParams}`)
    }
  }


  // Retrieve the top artists, set the hot_artists state
  // First render only
  useEffect(() => {
    (async() => {
      let res = await fetch('/api/artists/')
      let hot_artists = await res.json()
      hot_artists = hot_artists.hot_artists

      hot_artists.reverse()
      setHotArtists(hot_artists)
    })()
  }, [])


  // Enable side scrolling of artists
  const sideScroll = (e) => {
    if (e.deltaY > 0) {
      artistsRef.current.scrollLeft += 50;
    }
    else artistsRef.current.scrollLeft -= 50;
  }

  // Disable vert scrolling while mouse is over side scroller
  const disableScrolling = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = () => {
      window.scrollTo(scrollLeft, scrollTop)
    }
  }
  // Enable side scrolling when mouse moves away
  const enableScrolling = () => {
    window.onscroll = () => {};
  }


  return (
    <div className={c.home_page}>
      <div className={c.title}>
        Welcome to Backyard Bonnaroo
      </div>
      <div className={c.subtitle}>
        Keeping it Live, Loud and Local since 2021
      </div>
      <div className={c.input_holder}>
        <input
          className={c.input}
          type='search'
          placeholder='Enter a city name or zip code'
          onKeyPress={enterPressed}
        />
      </div>
      <div className={c.image_holder}>
          <img src='/static/home.jpg' alt='pleasant summer backyard concert' className={c.home_img}/>
      </div>
      <div className={c.artists_parent}>
        <div className={c.artists_scroller_title}>
          Today's Top Artists
        </div>
        <div
          className={c.artists_scroller_container}
          onWheel={sideScroll}
          onMouseEnter={disableScrolling}
          onMouseLeave={enableScrolling}
          ref={artistsRef}
        >
          <div
            className={c.artists_scroller}
          >
              {hotArtists.map(artist => (
                <ArtistCard artist={artist} key={artist.name}></ArtistCard>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
