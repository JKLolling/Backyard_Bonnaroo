import React from "react";
import {useSelector,useDispatch} from 'react-redux'

// Redux stuff
import {asyncRemoveShow} from '../../store/session'

//Styling
import c from './User.module.css'

function User() {

  // This contains all the user information, including reservations
  const storeUserData = useSelector(store => store.session.user)

  const dispatch = useDispatch()


  if (!storeUserData?.id) {
    return null;
  }
  // This won't work yet
  const cancelReservation = async (e) => {

    if (e.target.innerText !== 'CANCEL RESERVATION'){
      return;
    }
    let show_id_child = e.currentTarget.querySelector('input')
    await dispatch(asyncRemoveShow(show_id_child.value, storeUserData.id))
  }


  const getFormattedTime = (showTime) => {
    let time
    let m = 'AM'
    let [hours, minutes] = showTime.split(':')
    if (hours > 12){
      hours -= 12
      m = 'PM'
    }
    time = `${hours}:${minutes} ${m}`

    return time
  }


  const dayMap = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
  const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const getFormattedDateTime = (showDate,showTime) => {
    let date_arr = showDate.split('-')
    let [year, month, date] = date_arr

    if (date[0] === '0') date = date[1]
    if (month[0] === '0') month = month[1]
    month--

    const day_index = new Date(year, month, date).getDay()

    const formattedTime = getFormattedTime(showTime)

    return `${dayMap[day_index]} ▪ ${monthMap[month]} ${date}, ${year} ▪ ${formattedTime}`
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
              List of Reviews
              <div className={c.temp}>
                Content coming soon!
              </div>
            </div>
        </div>
      </div>
    </div>

  );
}
export default User;
