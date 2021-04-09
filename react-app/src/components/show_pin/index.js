import React, {useRef, useState} from 'react';

import c from './ShowPin.module.css'

const ShowPin = ({$hover, show_data, mapsReference}) => {
  const detailsRef = useRef()
  const pinRef = useRef()

  const [detailStyle, setDetailStyle] = useState(c.hidden)


  // if (mapsReference && detailsRef.current) {
  //   mapsReference.OverlayView.preventMapHitsAndGesturesFrom(containerRef.current);
  // }

  const pin_style = $hover ? `${c.hovered} ${c.pin}` : c.pin
  const detail_style = $hover ? c.hovered_details : c.hidden

  const openDetails = (e) => {
    // setDetailStyle(c.details)
    // let hovered_detail = `${c.hovered_details} ${c.details}`
    // if (detailsRef.current)
    //   detailsRef.current.className = hovered_detail
  }


  // let detail_style
  // if (detailsRef?.current){
  //   let hovered_detail = $hover ? c.hovered_details : c.hidden
  //   if (hovered_detail !== detailStyle){
  //     console.log(hovered_detail)
  //     setDetailStyle(hovered_detail)
  //   }
  //   // detailsRef.current.className = hovered_detail
  // }


  const setActiveShowCard = () => {
    console.log(show_data)
    // if (mapsReference) {
    //   console.log('hi')
    //   mapsReference.OverlayView.preventMapHitsFrom(detailsRef.current);
    //   mapsReference.OverlayView.preventMapHitsAndGesturesFrom(pinRef.current);
    //   console.log(detailsRef.current)
    // }
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
        onClick={setActiveShowCard}
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
