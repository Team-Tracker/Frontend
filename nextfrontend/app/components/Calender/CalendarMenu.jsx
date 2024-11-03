"use client";

import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import AddAppointmentPopup from "./AddAppointmentPopup";

export default function CalendarMenu({ viewMode, setViewMode, onAdd, selectedDate, setSelectedDate }) {
  const handleNextMonth = () => setSelectedDate(addMonths(selectedDate, 1));
  const handlePrevMonth = () => setSelectedDate(subMonths(selectedDate, 1));

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300 text-black">
      <AddAppointmentPopup />

      <div className="flex items-center text-lg font-bold space-x-4">
        <button
          onClick={handlePrevMonth}
          className="bg-transparent border-none text-lg cursor-pointer"
        >
          {"<"}
        </button>
        <span>{format(selectedDate, 'MMMM yyyy')}</span>
        <button
          onClick={handleNextMonth}
          className="bg-transparent border-none text-lg cursor-pointer"
        >
          {">"}
        </button>
      </div>
      
      <button
        onClick={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}
        className="px-4 py-2 text-base bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        {viewMode === 'month' ? 'Month View' : 'Week View'}
      </button>
    </div>
  );
}
