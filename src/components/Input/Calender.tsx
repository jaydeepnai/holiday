"use client"
import React from 'react'
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
interface CalenderProps {
  values: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[]
}

const Calender: React.FC<CalenderProps> = ({
  values,
  onChange,
  disabledDates
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[values]}
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
