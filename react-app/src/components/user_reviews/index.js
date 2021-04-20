import React, {useEffect, useRef, useState} from 'react'

import {getFormattedDateTime} from '../../services/date_time'

//Store
import { useDispatch} from 'react-redux'
import {asyncSetReview} from '../../store/session'

import c from './UserReview.module.css'

const star_color = 'gold'
const empty_star_color = 'lightgrey'

const UserReview = ({show, user_id, review}) => {
  const ratingRef = useRef()
  const dispatch = useDispatch()

  const [rating, setRating] = useState(review?.rating)

  // fills in the stars with whatever the rating is
  useEffect(() => {
    ratingRef.current.style.background = `linear-gradient(to right, ${star_color} 0%, ${star_color} ${rating}%, ${empty_star_color} ${rating}%, ${empty_star_color} 100%)`
    ratingRef.current.style['-webkit-background-clip'] = 'text'
  }, [rating])

  // allows the user to change the number of stars
  const slideStars = (e) => {
      const distanceFromLeft = ratingRef.current.getBoundingClientRect().left
      const relativePosition = e.clientX - distanceFromLeft

      const width = ratingRef.current.offsetWidth

      const percentage = Math.round(parseFloat((Math.abs(relativePosition) / width).toFixed(2)) * 100)

      setRating(percentage)
  }


  // Allows the user to save their new review
  const changeRating = async () => {
    dispatch(asyncSetReview(show.artist_id, user_id, show.id, rating))
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
          onClick={slideStars}
          onMouseLeave={resetRating}
          ref={ratingRef}
        >
          ★★★★★
        </div>
        <div>
          <button onClick={changeRating}>Howdy</button>
        </div>
        <div>
          <input type='hidden' value={show.id}></input>
        </div>
      </div>
    </div>
  )
}

export default UserReview
