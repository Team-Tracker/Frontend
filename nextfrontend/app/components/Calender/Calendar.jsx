"use client";
// /components/Calendar/Calendar.js
import { useState } from 'react';
import CalendarMenu from './CalendarMenu';
import CalendarTable from './CalendarTable';
import AppointmentPopup from './AppointmentPopup';
import { startOfMonth } from 'date-fns';

export default function Calendar() {
  const [viewMode, setViewMode] = useState('month'); // Toggle between 'month' and 'week'
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfMonth(new Date()));

  return (
    <div className="Calendar">
      <div className="Menu">
        <CalendarMenu 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onAdd={() => setShowPopup(true)} 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="Body">
        <CalendarTable viewMode={viewMode} onDateClick={() => setShowPopup(true)} selectedDate={selectedDate} />
      </div>
      {showPopup && <AppointmentPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
