import React from 'react'

//Store
import {useSelector, useDispatch} from 'react-redux'


import {openModalLogin} from '../../store/modal';
import {asyncMakeReservation} from '../../store/session'

//Styling
import c from './Shows.module.css'

const ShowCard = ({info}) => {
  const dispatch = useDispatch()

  const storeUserData = useSelector(store => store.session.user)
  console.log(storeUserData?.reservations)

  const makeReservation = async (e) => {
    if (!storeUserData){
      dispatch(openModalLogin())
    } else if (e.target.innerText === 'Reserve a Spot!') {
      await dispatch(asyncMakeReservation(info.id, storeUserData.id))

      // const res = await fetch(`/api/users/${storeUserData.id}/reservations`, {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify(info.id)
      // })
      // const data = await res.json()
      // Display some kind of success message to the user
      // Also, be sure to check that they haven't already reserved this spot
    }
  }

  let button_text = 'Reserve a Spot!'
  if (storeUserData?.reservations){
    for (let i = 0; i < storeUserData.reservations.length; i++){
      let show = storeUserData.reservations[i]
      if(info.id === show.id){
        button_text = 'You have already reserved this show'
      }
    }
  }
  // if (storeUserData?.reservations && storeUserData.reservations.includes)
  return (
    <div className={c.card_holder}>
      <div className={c.left_side}>
        <div>
          <img src={info.artist.banner_URL} alt='band' className={c.band_photo}></img>
        </div>
        <div>
          <audio src={info.artist.sample_song} controls></audio>
        </div>
      </div>
      <div className={c.right_side}>
        <div>
          {info.artist.name}
        </div>
        <div>
          {info.address}
        </div>
        <div>
          {info.time}
        </div>
        <div>
          {info.cost}
        </div>
        <div>
          {info.description}
        </div>
        <div>
          <button onClick={makeReservation}>
            {button_text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowCard
