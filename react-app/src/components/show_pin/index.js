import React from 'react';

import c from './ShowPin.module.css'

const ShowPin = ({$hover}) => {

  const style = $hover ? `${c.hovered} ${c.pin}` : c.pin

  return (
    <div>
      <img src='../static/pin.png' alt='pin' className={style}></img>
    </div>
  )
}

export default ShowPin
