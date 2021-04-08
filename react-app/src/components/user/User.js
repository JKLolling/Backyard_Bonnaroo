import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'

// Redux stuff
import {asyncRemoveShow} from '../../store/session'

//Styling
import c from './User.module.css'

function User() {
  // const [storeUserData, setUser] = useState({});

  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  const storeUserData = useSelector(store => store.session.user)
  console.log('StoreData', storeUserData)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!userId) {
  //     return
  //   }
  //   (async () => {
  //     const response = await fetch(`/api/users/${userId}`);
  //     const storeUserData = await response.json();
  //     console.log('fetch request', storeUserData)
  //     setUser(storeUserData);
  //   })();
  // }, [userId]);

  if (!storeUserData.id) {
    return null;
  } else {
    // console.log(storeUserData)
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

    const res = await dispatch(asyncRemoveShow(temp, storeUserData.id))
    // const data = await res.json()
    // console.log(data)
    // const res = await fetch(`/api/users/${storeUserData.id}/reservations`, {
    //   method: 'DELETE',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(temp)
    // })
    // const data = await res.json()
  }

  // if (storeUserData?.reservations){
  //   console.log(storeUserData?.reservations[0]?.artist.name)
  // }
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
