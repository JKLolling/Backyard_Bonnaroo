import React from 'react'

//Styling
import c from './Shows.module.css'

const ShowCard = ({info}) => {
  return (
    <div className={c.card_holder}>
      {info.address}
    </div>
  )
}

export default ShowCard
