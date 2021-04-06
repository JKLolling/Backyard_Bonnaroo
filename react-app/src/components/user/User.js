import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Styling
import c from './User.module.css'

function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user.id) {
    return null;
  } else {
    console.log(user)
  }

  const cancelReservation = async (e) => {

    let temp = e.currentTarget.innerText

    temp = temp.split('|')
    console.log(temp)
    temp = {
      artist:temp[0],
      time:temp[2],
      date:temp[3]
    }
    console.log(temp)
    const res = await fetch(`/api/users/${user.id}/reservations`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(temp)
    })
    const data = await res.json()
  }

  // if (user?.reservations){
  //   console.log(user?.reservations[0]?.artist.name)
  // }
  return (
    <div className={c.page_parent}>
      <div className={c.page_container}>
        <div className={c.banner}>
          <div className={c.title}>Welcome {user.username}</div>
          <img src='../static/guitree.jpg' className={c.banner_img} alt='profile banner'></img>
        </div>
        <div className={c.content}>
            <div className={c.reserved_shows}>
              {user.reservations && user.reservations.map(show => (
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
                    <button>Cancel reservation</button>
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
