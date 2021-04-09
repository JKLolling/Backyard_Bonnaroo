import React, {useRef} from 'react';

import c from './ShowPin.module.css'

const ShowPin = ({$hover, show_data, mapsReference}) => {
  const detailsRef = useRef()
  const pinRef = useRef()




  // if (mapsReference && detailsRef.current) {
  //   mapsReference.OverlayView.preventMapHitsAndGesturesFrom(containerRef.current);
  // }

  const pin_style = $hover ? `${c.hovered} ${c.pin}` : c.pin
  const detail_style = $hover ? c.hovered_details : c.hidden

  const openDetails = (e) => {
    let card = document.getElementById(show_data.id)
    card.scrollIntoView();
  }


  let time
  if (show_data?.time){
    let m = 'AM'
    let [hours, minutes] = show_data.time.split(':')
    if (hours > 12){
      hours -= 12
      m = 'PM'
    }
    time = `${hours}:${minutes} ${m}`
  }

  return (
    <div>
      <div
        onClick={openDetails}
        ref={pinRef}
      >
        <img src='../static/pin.png' alt='pin' className={pin_style}></img>
      </div>
      <div
        className={detail_style}
        ref={detailsRef}
      >
        <div className={c.artist}>
          {show_data.artist.name}
        </div>
        <div>
          {time}
        </div>
        <div>
          ${show_data.cost}
        </div>
      </div>
    </div>
  )
}

export default ShowPin
