"use client";

// /components/Calendar/CalendarTable.js
import { useState, useEffect } from 'react';
import { eachDayOfInterval, endOfMonth, format, startOfMonth, getDay } from 'date-fns';
import AppointmentList from './AppointmentList';

import "./CalenderTable.css";

export default function CalendarTable({ viewMode, onDateClick, selectedDate }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [days, setDays] = useState([]);

  useEffect(() => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const daysInMonth = eachDayOfInterval({ start, end }).map((day) => ({
      date: day,
      displayDate: format(day, 'd'),
    }));

    // Calculate padding for days before the start of the month
    const firstDayIndex = (getDay(start) + 6) % 7; // Adjust to make Monday = 0, ... , Sunday = 6
    const paddedDays = Array(firstDayIndex).fill(null).concat(daysInMonth);
    setDays(paddedDays);
  }, [selectedDate]);

  /**
   * RenderCells:
   * renders every cell for the month
   * 
   * Format pattern:
   * 'MMMM d' -> November 2
   * 'MMM d'  -> Nov 2
   * 'MM d '  -> 11 2
   * 'M d'    -> 11 2
   * 'd'      -> 2
   */
  const renderCells = () => {
    return days.map((day, index) => (
      <div key={index} className="CalendarCell" onClick={day ? () => onDateClick(day.date) : null}>
        {day && <AppointmentList day={format(day.date, 'd')} />}
        
      </div>
    ));
  };

  return (
    <div className="CalendarContainer">
      <div className="CalendarHeader">
        {daysOfWeek.map((day) => (
          <div key={day} className="CalendarHeaderDay">{day}</div>
        ))}
      </div>
      <div className="CalendarBody">
        {renderCells()}
      </div>
    </div>
  );
}
