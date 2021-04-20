import React, {useRef} from 'react'

import {getFormattedDateTime} from '../../services/date_time'

import c from './UserReview.module.css'

const star_color = 'gold'
const empty_star_color = 'grey'

const UserReview = ({show}) => {
  const ratingRef = useRef()

  const changeRating = (e) => {
      const distanceFromLeft = ratingRef.current.getBoundingClientRect().left
      const relativePosition = e.clientX - distanceFromLeft

      const width = ratingRef.current.offsetWidth

      const percentage = parseFloat((Math.abs(relativePosition) / width).toFixed(2)) * 100

      ratingRef.current.style.background = `linear-gradient(to right, ${star_color} 0%, ${star_color} ${percentage}%, ${empty_star_color} ${percentage}%, ${empty_star_color} 100%)`
      ratingRef.current.style['-webkit-background-clip'] = 'text'
  }

  const resetRating = () => {
    // reset the rating to the whatever is in the database
  }

  return (
    <div
      key={`${show.artist.name}${show.date}`}
      className={c.review_card}
    >
      <div className={c.past_show_info}>
        <div className={c.past_artist_and_date}>
          <span className={c.past_artist}>
            {show.artist.name}
          </span>
          <span className={c.past_date_time}>
            {getFormattedDateTime(show.date, show.time)}
          </span>
        </div>
        <div className={c.past_address}>
          {show.address}
        </div>
        <div
          className={c.stars}
          onMouseMove={changeRating}
          onMouseLeave={resetRating}
          ref={ratingRef}
        >
          ★★★★★
        </div>
        <div>
          <input type='hidden' value={show.id}></input>
        </div>
      </div>
    </div>
  )
}

export default UserReview
