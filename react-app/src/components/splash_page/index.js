import React, { useEffect, useRef, useState } from 'react'
import {useHistory} from 'react-router-dom'

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

      console.log(hot_artists)
      setHotArtists(hot_artists)
    })()
  }, [])


  const sideScroll = (e) => {
    if (e.deltaY > 0) {
      artistsRef.current.scrollLeft += 50;
    }
    else artistsRef.current.scrollLeft -= 50;
  }

  const enableScrolling = () => {
    console.log('hi')
    window.onscroll = () => {};
  }

  const disableScrolling = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    console.log(scrollTop)


    window.onscroll = () => {
      window.scrollTo(scrollLeft, scrollTop)
    }
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
        <div className={c.artists_into}>
          Hot artists go here, organized by their average ranking. Perhaps a modal?
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
                <div className={c.artist_card}>
                  <div>
                    {artist.name}
                  </div>
                  <div className={c.image_container} style={{backgroundImage: `url(${artist.banner_URL})`}}>
                    <img className={c.band_photo} src={artist.banner_URL} alt='the band'></img>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
