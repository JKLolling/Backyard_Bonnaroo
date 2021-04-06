import React from 'react'

//Styling
import c from './Shows.module.css'

const ShowCard = ({info}) => {
  return (
    <div className={c.card_holder}>
      <div className={c.left_side}>
        <div>
          <img src={info.artist.banner_URL} alt='band' className={c.band_photo}></img>
        </div>
      </div>
      <div className={c.right_side}>
        <div>
          {info.artist.name}
        </div>
        <div>
          {info.address}
        </div>
        <div>
          <audio src={info.artist.sample_song} controls></audio>
        </div>
      </div>
    </div>
  )
}

export default ShowCard
