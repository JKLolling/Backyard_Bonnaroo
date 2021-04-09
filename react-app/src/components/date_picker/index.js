import React, { useEffect, useState, useRef } from 'react';
import { useDispatch} from 'react-redux';
import Modal from 'react-modal';

import {mapSetDate} from '../../store/map'


//Styling
import c from './DatePicker.module.css'

const DatePicker = () => {

  Modal.setAppElement('#root');

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth())
  const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear())
  const [currentCalendarSlice, setCurrentCalendarSlice] = useState([])
  // const [selectedDate, setSelectedDate] = useState(null)

  const inputRef = useRef()

  const openModal = () => {
    setShowModal(true)
    inputRef.current.style.width = '100%'
  }
  const closeModal = () => {
    setShowModal(false)
    inputRef.current.style.width = '50%'
    inputRef.current.blur()
    console.log(inputRef.current === document.activeElement, document.activeElement)
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


  const increaseMonth = () => {
    if(selectedMonth === 11){
      setSelectedMonth(0)
      increaseYear()
    } else{
      setSelectedMonth(() => selectedMonth + 1)
    }
  }
  const increaseYear = () => {
    setSelectedYear(() => selectedYear + 1)
  }
  const decreaseMonth = () => {
    if(selectedMonth === 0){
      setSelectedMonth(11)
      decreaseYear()
    } else{
      setSelectedMonth(() => selectedMonth - 1)
    }
  }
  const decreaseYear = () => {
    setSelectedYear(() => selectedYear - 1)
  }


  const dateClicked = (e) => {
    if (!e.target.className.includes('invalid')){
      let temp = new Date(selectedYear, selectedMonth, e.target.innerText)

      let month = temp.getMonth() + 1
      if (month < 10){
        month = `0${month}`
      }
      let year = temp.getFullYear()
      let day = temp.getDate()
      if (day < 10){
        day = `0${day}`
      }

      let string_date = `${year}-${month}-${day}`
      dispatch(mapSetDate(string_date))
      closeModal()
    }

    // setSelectedDate(temp)
  }

  const getDayClass = (i, day) => {
    let style;
    if (i <= 14 && day >= 20){
      style = `${c.day_holder} ${c.invalid}`
    }
    else if (i >=20 && day < 7){
      style = `${c.day_holder} ${c.invalid}`
    }
    else
      style =`${c.day_holder} ${c.valid}`

    return style
  }
  const days_header = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT']
  const monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return (
    <>
      <div onClick={openModal}>
        <input
          type='text'
          className={c.date_input}
          placeholder='When'
          ref={inputRef}
          readOnly={true}
        />
      </div>
      <Modal
        isOpen={showModal}
        className={c.content}
        overlayClassName={c.overlay}
        onRequestClose={closeModal}
        shouldFocusAfterRender={true}
      >
        <div className={c.container}>
          <div className={c.year_controls}>
            <div className={c.year_left_chev}
              onClick={decreaseYear}
            >
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className={c.year}>
              {selectedYear}
            </div>
            <div className={c.year_right_controls}
              onClick={increaseYear}
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
          <div className={c.month_controls}>
            <div className={c.month_left_chev} onClick={decreaseMonth}>
              <i className="fas fa-chevron-left"></i>
            </div>
            <div className={c.month}>
              {monthMap[selectedMonth]}
            </div>
            <div className={c.month_right_controls} onClick={increaseMonth}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
          {/* <div className={c.calendar_container}> */}
            <div className={c.calendar}>
              <div className={c.day_headers_row}>
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
                {currentCalendarSlice.map((day, i) =>
                  <div
                    key={`$day}${i}`}
                    className={getDayClass(day, i)}
                    onClick={dateClicked}
                  >
                    {day}
                  </div>
                )}
              </div>
            </div>
          {/* </div> */}
        </div>
      </Modal>
    </>

  );
}

export default DatePicker;
