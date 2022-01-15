import React, { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";

const Calendar = ({
  calenderDate,
  setCalenderDate,
  toggleCalender,
  handleChildElementClick,
}) => {
  const [date, setDate] = useState(null);
  function onChange(nextValue) {
    setCalenderDate(nextValue);
  }

  useEffect(() => {
    if (calenderDate) {
      setDate(calenderDate.toDateString());
    }
  }, [calenderDate]);

  return (
    <div className="popup" onClick={toggleCalender}>
      <div className="modal" onClick={(e) => handleChildElementClick(e)}>
        <ReactCalendar onChange={onChange} value={calenderDate} />
        <h1>{date}</h1>
      </div>
    </div>
  );
};

export default Calendar;
