import React, {useEffect, useRef, useState} from 'react'

// Utils
import {getFormattedDateTime} from '../../services/date_time'

//Store
import {useDispatch} from 'react-redux'
import {asyncSetReview} from '../../store/session'

// Styling
import c from './UserReview.module.css'

const star_color = 'rgb(255, 0, 0)'
const empty_star_color = 'rgb(148, 146, 146)'



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
    if (rating !== review?.rating && rating !== -1){
      let old_rating = review?.rating
      if (review?.rating === undefined){
        old_rating = null
      }
      dispatch(asyncSetReview(show.artist_id, user_id, show.id, old_rating,rating))
    }
  }

  const resetRating = () => {
    if (!review){
      setRating(-1)
      return
    }
    setRating(review.rating)
  }

  let button_style = c.save_button
  if (review?.rating === rating || rating === -1){
    button_style = c.already_saved
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
        <div>
          <input type='hidden' value={show.id}></input>
        </div>
      </div>
      <div className={c.stars_holder}>
          <div
            className={c.stars}
            onClick={slideStars}
            ref={ratingRef}
          >
            ★★★★★
          </div>
          <div>
            <button onClick={changeRating} className={button_style}>Save</button>
          </div>
          <div>
            <button onClick={resetRating} className={button_style}>Reset</button>
          </div>
      </div>
    </div>
  )
}

export default UserReview
