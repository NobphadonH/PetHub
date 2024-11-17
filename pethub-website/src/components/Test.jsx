import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Test = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const disabledDates = [
    new Date('2024-11-05'),
    new Date('2024-11-08'),
    new Date('2024-11-17'),
    new Date('2024-11-21')
  ];

  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const isDateDisabled = (date) => {
    // Check if the current date is in the disabledDates array
    return disabledDates.some(disabledDate => 
      disabledDate.getDate() === date.getDate() &&
      disabledDate.getMonth() === date.getMonth() &&
      disabledDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div>
      <label className='input'>Select Date:</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        filterDate={date => !isDateDisabled(date)}  // Disable specific dates
        placeholderText="Select a date"
      />
    </div>
  );
};

export default Test;
