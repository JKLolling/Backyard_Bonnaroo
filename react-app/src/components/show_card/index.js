import React from 'react'

//Store
import {useSelector, useDispatch} from 'react-redux'
import {openModalLogin} from '../../store/modal';
import {asyncMakeReservation} from '../../store/session'

//Components
import AudioPlayer from '../audio_player'

//Styling
import c from './Shows.module.css'

const ShowCard = ({info}) => {
  const dispatch = useDispatch()

  const storeUserData = useSelector(store => store.session.user)

  const makeReservation = async (e) => {

    if (!storeUserData){
      dispatch(openModalLogin())
    } else if (e.target.innerText.toUpperCase() === 'RESERVE A SPOT!') {
      await dispatch(asyncMakeReservation(info.id, storeUserData.id))
    }
  }

  // Different styling options for the button
  // Checks if the user has already registered
  // Also checks if the date has already passed
  let button_style = c.reservation_button
  let button_text = 'Reserve a Spot!'
  if (storeUserData?.reservations){
    for (let i = 0; i < storeUserData.reservations.length; i++){
      let show = storeUserData.reservations[i]

      // If they have registered
      if(info.id === show.id){
        button_text = 'You have already reserved a spot'
        button_style = c.already_registered_button
      }

      //If the date has passed
      const today = new Date()

      const temp = info.date.split('-')
      const show_date = new Date(temp)

      today.setHours(0,0,0,0)
      show_date.setHours(0,0,0,0)

      if (today.getTime() > show_date.getTime()){
        button_text = 'This show has already happened'
        button_style = c.already_registered_button
      }
    }
  }

  let time
  if (info?.time){
    let m = 'AM'
    let [hours, minutes] = info.time.split(':')
    if (hours > 12){
      hours -= 12
      m = 'PM'
    }
    time = `${hours}:${minutes} ${m}`
  }


  return (
    <div className={c.card_holder} id={info.id}>
      <div className={c.left_side}>
        <div className={c.image_container}>
          <img src={info.artist.banner_URL} alt='band' className={c.band_photo}></img>
        </div>
        <AudioPlayer song_url={info.artist.sample_song}/>
      </div>
      <div className={c.right_side}>
        <div className={c.artist_name}>
          {info.artist.name}
        </div>
        <div className={c.address}>
          {info.address}
        </div>
        <div className={c.time}>
          {time}
        </div>
        <div className={c.cost}>
          Cost: ${info.cost}
        </div>
        <div className={c.description}>
          {info.description}
        </div>
        <div className={c.reservation_div}>
          <button onClick={makeReservation} className={button_style}>
            {button_text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowCard
