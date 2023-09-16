import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h2>Date Picker </h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        isClearable
        showYearDropdown
        scrollableYearDropdown
      />
      {selectedDate && (
        <p>Selected Date: {selectedDate.toDateString()}</p>
      )}
    </div>
  );
}

export default MyDatePicker;
