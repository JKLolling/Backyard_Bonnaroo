import React from "react";
import {useSelector,useDispatch} from 'react-redux'

// Redux stuff
import {asyncRemoveShow} from '../../store/session'

//Styling
import c from './User.module.css'

function User() {
  const storeUserData = useSelector(store => store.session.user)

  const dispatch = useDispatch()


  if (!storeUserData.id) {
    return null;
  }
  const cancelReservation = async (e) => {

    if (e.target.innerText !== 'Cancel Reservation'){
      return;
    }

    let temp = e.currentTarget.innerText

    temp = temp.split('|')
    temp = {
      artist:temp[0],
      time:temp[2],
      date:temp[3]
    }

    await dispatch(asyncRemoveShow(temp, storeUserData.id))
  }

  return (
    <div className={c.page_parent}>
      <div className={c.page_container}>
        <div className={c.banner}>
          <div className={c.title}>Welcome {storeUserData.username}</div>
          <img src='../static/guitree.jpg' className={c.banner_img} alt='profile banner'></img>
        </div>
        <div className={c.content}>
            <div className={c.reserved_shows}>
              {storeUserData.reservations && storeUserData.reservations.map(show => (
                <div  key={`${show.artist}${show.date}`} onClick={cancelReservation}>
                  <div>
                    {show.artist.name}
                    |
                    {show.address}
                    |
                    {show.time}
                    |
                    {show.date}
                    |
                    {show.cost}
                  </div>
                  <div>
                    <button className={c.cancel_button}>Cancel Reservation</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={c.reviews}>
              List of Reviews
            </div>
        </div>
      </div>
    </div>

  );
}
export default User;
