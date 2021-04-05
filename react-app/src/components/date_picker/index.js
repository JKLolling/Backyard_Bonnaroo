import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
// import { closeModalLogin, openModalLogin, openModalSignUp} from '../../store/modal';


//Styling
import c from './DatePicker.module.css'

const DatePicker = () => {

Modal.setAppElement('#root');


  const [showModal, setShowModal] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth())
  const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear())
  const [currentCalendarSlice, setCurrentCalendarSlice] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  // const [selectedDay, setSelectedDay ]

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = (e) => {
    setShowModal(false)
  }

  const getNumDaysInMonth = (month_num, year) => {
    return 42 - new Date(year, month_num, 42).getDate()
  }

  useEffect(() => {
    const getDaysInPreviousMonth = (month_num, year_num) => {
      let last_month = month_num
      let year = year_num

      if (month_num === 0){
        last_month = 12
        year--
      } else {
        last_month--
      }

      return getNumDaysInMonth(last_month, year)
    }

    const num_days = getNumDaysInMonth(selectedMonth, selectedYear)
    const start_of_month_day = new Date(selectedYear, selectedMonth).getDay()

    const numDaysLastMonth = getDaysInPreviousMonth(selectedMonth, selectedYear)

    const temp = []
    for (let i= 0; i< start_of_month_day; i++){
      temp.unshift(numDaysLastMonth-i)
    }
    for (let i = 0; i< num_days; i++){
      temp.push(i+1)
    }
    const remaining_filler_days = 42- temp.length
    for (let i= 0; i< remaining_filler_days; i++){
      temp.push(i+1)
    }
    setCurrentCalendarSlice(temp)
  }, [selectedMonth, selectedYear])


  const dateClicked = (e) => {
    const temp = new Date(selectedYear, selectedMonth, e.target.innerText)
    setSelectedDate(temp)
  }
  const days_header = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']
  return (
    <>
      <div onClick={openModal}>
        dates
      </div>
      <Modal
        isOpen={showModal}
        className={c.content}
        overlayClassName={c.overlay}
        onRequestClose={closeModal}
        shouldFocusAfterRender={true}
      >
        <div className={c.container}>
          <h3 className={c.title}>Pick a date</h3>
          {/* <div className={c.form__container}> */}
            {/* <form onSubmit={handleSubmit} className={c.form}> */}
          <div className={c.picker_parent}>
            <input
              className={c.input}
              type='date'
              name='date'
            />
            <div className={c.calendar}>
              <div className={c.day_headers}>
                {days_header.map(day => (
                  <span
                    key={day}
                    className={c.day_header}
                  >
                    {day}
                  </span>
                ))}
              </div>
              <div className={c.days_holder}>
                {currentCalendarSlice.map(day =>
                  <div
                    className={c.day_holder}
                    onClick={dateClicked}
                  >
                    {day}
                  </div>
                )}
              </div>
            </div>
          </div>
            {/* </form> */}
          {/* </div> */}
        </div>
      </Modal>
    </>

  );
}

export default DatePicker;
