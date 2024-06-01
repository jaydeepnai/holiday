"use client"
import React from 'react'
import 'react-date-range/dist/style.css'
import 'react-date-range/dist/theme/default.css'

interface CalenderProps {
    value : Range;
    onChange:(value : RangeKeyDict)=>void;
    disabledDates?:Date[]
}

const Calender:React.FC<CalenderProps> = ({
    value,
    onChange,
    disabledDates
}) => {
  return (
    <DateRange
    rangeColors={["#262626"]}
    ranges={[value]}
    data={new Date()}
    onChange={onChange}
    direction="vertical"
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
    />
  )
}

export default Calender
