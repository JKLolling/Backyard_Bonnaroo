const dayMap = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const getFormattedTime = (showTime) => {
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

export const getFormattedDateTime = (showDate,showTime) => {
  let date_arr = showDate.split('-')
  let [year, month, date] = date_arr

  if (date[0] === '0') date = date[1]
  if (month[0] === '0') month = month[1]
  month--

  const day_index = new Date(year, month, date).getDay()

  const formattedTime = getFormattedTime(showTime)

  return `${dayMap[day_index]} ▪ ${monthMap[month]} ${date}, ${year} ▪ ${formattedTime}`
}
