import {useEffect, useState} from 'react';
import { Calendar, Badge } from 'rsuite';


function getTodoList(date, booked_dates) {
  if (!date || !booked_dates) {
    return [];
  }

  // Format the date as a string in DD/MM/YYYY format
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Check if the formattedDate exists in the booked_dates array
  if (booked_dates.includes(formattedDate)) {
    return [{ title: 'booking' }];
  }

  return [];
}


function renderCell(date, booked_dates) {
  const list = getTodoList(date, booked_dates);

  if (list.length) {
    return <Badge className="calendar-todo-item-badge" />;
  }

  return null;
}


const CalendarComponent = ({ bookedDates }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  console.log(currentMonth)

  const handleSelect = (date) => {
    setSelectedDate(date);
  };

  // Effect to handle updates to the bookedDates state
  useEffect(() => {
    if (bookedDates && bookedDates.length) {
      const dateString = bookedDates[0];  // Example DD/MM/YYYY format
      const [day, month, year] = dateString.split('/');  // Split the string
      const formattedDate = `${year}-${month}-${day}`;  // Reformat to YYYY-MM-DD

      setCurrentMonth(new Date(formattedDate));  // Pass to new Date

    }
  }, [bookedDates]); // Re-run effect when bookedDates change

  return (
    <div style={{ display: 'flex', gap: '10px', height: '100%', alignItems: 'flex-start' }}>
      <Calendar
        compact
        renderCell={(date) => renderCell(date, bookedDates)} // Pass booked_dates here
        onSelect={handleSelect}
        style={{ width: '100%' }}
        value={currentMonth} // Control the calendar's month view
      />
    </div>
  );
};


export default CalendarComponent;
