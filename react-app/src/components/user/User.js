import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux'

import UserReview from '../user_reviews'

import {getFormattedDateTime} from '../../services/date_time'

// Redux stuff
import {asyncRemoveShow} from '../../store/session'

//Styling
import c from './User.module.css'

function User() {

  // This contains all the user information, including reservations
  const storeUserData = useSelector(store => store.session.user)

  const dispatch = useDispatch()

  const [limit, setLimit] = useState(10)
  const [pastRes, setPastRes ] = useState(null)
  const [upcomingRes, setUpcomingRes] = useState(null)


  // Organize the reservations into past and present
  useEffect(() => {
    let total_reservations = storeUserData.reservations
    console.log(total_reservations)
    let upcoming_res_temp = []
    let past_res_temp = []
    total_reservations.forEach(reservation => {
      const today = new Date()

      const temp = reservation.date.split('-')
      const show_date = new Date(temp)

      today.setHours(0,0,0,0)
      show_date.setHours(0,0,0,0)

      if (today.getTime() <= show_date.getTime()){
        upcoming_res_temp.push(reservation)
      } else if (past_res_temp.length < limit){
        past_res_temp.push(reservation)
      }
    })
    // Rerverse the past shows so that the most recent shows are on top
    setPastRes(past_res_temp.reverse())
    setUpcomingRes(upcoming_res_temp)
  }, [storeUserData, limit])



  const cancelReservation = async (e) => {

    if (e.target.innerText !== 'CANCEL RESERVATION'){
      return;
    }
    let show_id_child = e.currentTarget.querySelector('input')
    await dispatch(asyncRemoveShow(show_id_child.value, storeUserData.id))
  }

  const showMore = (e) => {
    setLimit(limit => limit + 10)
  }


  if (!storeUserData?.id) {
    return null;
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
              <div className={c.reserved_shows_header}>
                Upcoming Shows
              </div>
              {upcomingRes && upcomingRes.map(show => (
                <div
                  key={`${show.artist.name}${show.date}`}
                  onClick={cancelReservation}
                  className={c.user_showcard}
                  >
                    <div className={c.show_info}>
                      <div className={c.artist}>
                        {show.artist.name}
                      </div>
                      <div className={c.date_time}>
                        {getFormattedDateTime(show.date, show.time)}
                      </div>
                      <div className={c.cost}>
                        ${show.cost}
                      </div>
                      <div className={c.address}>
                        {show.address}
                      </div>
                      <div className={c.description}>
                        {show.description}
                      </div>
                      <div>
                        <input type='hidden' value={show.id}></input>
                      </div>
                    </div>
                    <div className={c.cancel_button_holder}>
                      <button className={c.cancel_button}>Cancel Reservation</button>
                    </div>
                </div>
              ))}
            </div>
            <div className={c.reviews}>
              <div className={c.reviews_header}>
                Past Shows
              </div>
              {pastRes && pastRes.map(show => (
                <UserReview show={show} key={show.artist.name+show.date+show.time} user_id={storeUserData.id} review={storeUserData.reviews[show.id]}/>
              ))}
              <div onClick={showMore}>
                Show More
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default User;
