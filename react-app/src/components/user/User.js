import React, { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {useHistory, useParams} from 'react-router-dom'

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

  const params = useParams()
  const history = useHistory()

  // TESTING: increase after demo
  const LIMIT_INCREASE = 5
  const [limit, setLimit] = useState(LIMIT_INCREASE)
  const [pastRes, setPastRes ] = useState(null)
  const [upcomingRes, setUpcomingRes] = useState(null)


  // Organize the reservations into past and present
  useEffect(() => {
    // reserverse is destructive, so you have to make a copy
    let total_reservations = storeUserData.reservations.slice()
    total_reservations.reverse()

    let upcoming_res_temp = []
    let past_res_temp = []
    total_reservations.forEach(reservation => {
      let today = new Date()

      // STRICTLY FOR TESTING
      // let tomorrow = new Date(today)
      // tomorrow.setDate(tomorrow.getDate() +2)
      // today = tomorrow
      // console.log(today.toDateString())

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
    // Reverse the upcoming shows so that the soonest shows are on top
    setPastRes(past_res_temp)
    setUpcomingRes(upcoming_res_temp.reverse())

  }, [storeUserData, limit])


  // This prevents users from navigating to another user's page.
  // The reason we prevent this is because all the user's data comes from the store, and is not updated based on the params.
  // So even if a user navigated to a different profile, the original user's data would still be there
  if (storeUserData.id !== parseInt(params.userId)){
    history.push(`/users/${storeUserData.id}`)
  }

  const cancelReservation = async (e) => {

    if (e.target.innerText !== 'CANCEL RESERVATION'){
      return;
    }
    let show_id_child = e.currentTarget.querySelector('input')
    await dispatch(asyncRemoveShow(show_id_child.value, storeUserData.id))
  }

  const showMore = (e) => {
    // if we are NOT already showing all the past reservations, then increase the limit
    let total_reservations = storeUserData.reservations
    if (pastRes.length !== total_reservations.length - upcomingRes.length)
      setLimit(limit => limit + LIMIT_INCREASE)
  }

  // Style the show more button
  // changes based on if there is anything more to show
  let showmore_style = c.showMore
  let total_reservations = storeUserData.reservations
  if (!pastRes?.length || pastRes.length === total_reservations.length - upcomingRes.length){
    showmore_style = c.noMore
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
              <div onClick={showMore} className={showmore_style}>
                Show More
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
export default User;
