import React, {useEffect, useRef} from 'react'

import c from './Stars.module.css'

const Stars = ({rating}) => {

  const star_color = 'rgb(255, 0, 0)'
  const empty_star_color = 'rgb(148, 146, 146)'
  const ratingRef = useRef()

  // fills in the stars with whatever the rating is
  useEffect(() => {
    ratingRef.current.style.background = `linear-gradient(to right, ${star_color} 0%, ${star_color} ${rating}%, ${empty_star_color} ${rating}%, ${empty_star_color} 100%)`
    ratingRef.current.style['-webkit-background-clip'] = 'text'
  })

  return (
    <div className={c.stars_holder}>
        <div
          className={c.stars}
          ref={ratingRef}
        >
          ★★★★★
        </div>
    </div>
  )
}

export default Stars
