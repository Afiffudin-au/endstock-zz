import React from 'react'
import ReactDatePicker from 'react-datepicker'
import styles from './DatePicker.module.css'
function DatePicker({
  startDate,
  setStartDate,
}: {
  startDate: any
  setStartDate: any
}) {
  return (
    <div className={styles.custom}>
      <ReactDatePicker
        dateFormat='yyyy-MM-dd'
        selected={startDate}
        onChange={(date: any) => setStartDate(date)}
        placeholderText='images added date'
      />
    </div>
  )
}

export default DatePicker
