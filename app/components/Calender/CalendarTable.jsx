// /components/Calendar/CalendarTable.js
"use client";

import { useState, useEffect } from 'react';
import { eachDayOfInterval, endOfMonth, format, startOfMonth, getDay, isToday } from 'date-fns';
import AppointmentList from './AppointmentList';

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
      <div
        key={index}
        className={`relative flex items-start justify-start min-h-[80px] border border-gray-300 text-left ${
          day && isToday(day.date) ? 'border-2 border-red-500' : ''
        }`}
        onClick={day ? () => onDateClick(day.date) : null}
      >
        {day && (
          <div className="absolute top-2 left-2 text-sm font-bold text-gray-700">
            {format(day.date, 'd')}
          </div>
        )}
        {day && <AppointmentList day={format(day.date, 'd')} />}
      </div>
    ));
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-900 p-4">
      <div className="grid grid-cols-7 border-b-4 border-gray-700 bg-white text-black pb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-bold p-3 text-center bg-white text-black">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 mt-4 bg-gray-100">{renderCells()}</div>
    </div>
  );
}
