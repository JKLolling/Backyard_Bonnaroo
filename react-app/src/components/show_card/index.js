import React from 'react'

//Store
import {useSelector, useDispatch} from 'react-redux'


import {openModalLogin} from '../../store/modal';

//Styling
import c from './Shows.module.css'

const ShowCard = ({info}) => {
  const dispatch = useDispatch()

  const storeUserData = useSelector(store => store.session.user)


  const makeReservation = () => {
    if (!storeUserData){
      dispatch(openModalLogin())
    }
  }

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
            Make A reservation
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShowCard
