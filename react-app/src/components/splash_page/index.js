import React from 'react'

// Styling
import c from './Home.module.css'

const HomePage = () => {

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
        />
      </div>
      <div className={c.image_holder}>
          <img src='/static/home.jpg' alt='pleasant summer backyard concert' className={c.home_img}/>
      </div>
    </div>
  )
}

export default HomePage
