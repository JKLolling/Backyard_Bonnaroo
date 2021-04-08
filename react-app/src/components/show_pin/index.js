import React, {useRef, useState} from 'react';
// import GoogleMapReact from 'google-map-react';
// import Modal from 'react-modal';

import c from './ShowPin.module.css'

const ShowPin = ({$hover, show_data, mapsReference}) => {
  const detailsRef = useRef()
  const containerRef = useRef()
  const pinRef = useRef()

  const [detailStyle, setDetailStyle] = useState(c.hidden)

  // const [showModal, setShowModal] = useState(false)

  if (mapsReference && detailsRef.current) {
    mapsReference.OverlayView.preventMapHitsAndGesturesFrom(containerRef.current);
  }

  const pin_style = $hover ? `${c.hovered} ${c.pin}` : c.pin

  const openDetails = (e) => {
    setDetailStyle(c.details)
    let hovered_detail = `${c.hovered_details} ${c.details}`
    if (detailsRef.current)
      detailsRef.current.className = hovered_detail
  }

  if (detailsRef?.current){
    let hovered_detail = $hover ? `${c.hovered_details} ${detailStyle}` : detailStyle
    detailsRef.current.className = hovered_detail
  }

  // const closeDetails = () => {
  //   setDetailStyle(c.hidden)
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

  // const openModal = () => {
  //   setShowModal(true)
  // }
  // const closeModal = (e) => {
  //   setShowModal(false)
  // }

  return (
    <div ref={containerRef}>
      <div
        // onClick={openModal}
        onClick={openDetails}
        ref={pinRef}
      >
        <img src='../static/pin.png' alt='pin' className={pin_style}></img>
      </div>
      {/* <Modal
        isOpen={showModal}
        className={c.modal}
        overlayClassName={c.overlay}
        // onRequestClose={closeModal}
        shouldFocusAfterRender={true}
      >
        <div className={c.content}>
          {show_data.artist.name}
        </div>
      </Modal> */}
      <div
        className={c.details}
        ref={detailsRef}
        onClick={setActiveShowCard}
      >
          {show_data.artist.name}
      </div>
    </div>
  )
}

export default ShowPin
