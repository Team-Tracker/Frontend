"use client";

import "./CalendarMenu.css";

// /components/Calendar/CalendarMenu.js
import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import AddAppointmentPopup from "./AddAppointmentPopup";

export default function CalendarMenu({ viewMode, setViewMode, onAdd, selectedDate, setSelectedDate }) {
  const handleNextMonth = () => setSelectedDate(addMonths(selectedDate, 1));
  const handlePrevMonth = () => setSelectedDate(subMonths(selectedDate, 1));

  return (
    <div className="CalendarMenu">
      <AddAppointmentPopup/>

      <div className="MonthSelector">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <span>{format(selectedDate, 'MMMM yyyy')}</span>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>
      
      <button onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}>
        {viewMode === 'month' ? 'Month View' : 'Week View'}
      </button>
    </div>
  );
}
