import React from 'react'
import {useHistory} from 'react-router-dom'

// Styling
import c from './Home.module.css'

const HomePage = () => {

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
      <div className={c.artists_container}>
        Hot artists go here, organized by their average ranking. Perhaps a modal?
      </div>
    </div>
  )
}

export default HomePage
