import React from 'react';

import c from './ShowPin.module.css'

const ShowPin = ({$hover, show_data}) => {

  const style = $hover ? `${c.hovered} ${c.pin}` : c.pin

  const temp = () => {
    console.log(show_data)
  }

  return (
    <div onClick={temp}>
      <img src='../static/pin.png' alt='pin' className={style}></img>
    </div>
  )
}

export default ShowPin
