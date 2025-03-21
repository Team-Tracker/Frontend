// /components/Calendar/CalendarTable.js
"use client";

import { useState, useEffect } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  getDay,
  isToday,
} from "date-fns";
import AppointmentList from "./AppointmentList";
import { getAssignments } from "@/app/services/calenderService";

export default function CalendarTable({
  viewMode,
  onDateClick,
  selectedDate,
  appointments, // Use appointments from props
}) {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [days, setDays] = useState([]);

  useEffect(() => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const daysInMonth = eachDayOfInterval({ start, end }).map((day) => ({
      date: day,
      displayDate: format(day, "d"),
    }));

    const firstDayIndex = (getDay(start) + 6) % 7;
    const paddedDays = Array(firstDayIndex).fill(null).concat(daysInMonth);
    setDays(paddedDays);
  }, [selectedDate]);

  const getAppointmentsForDay = (date) => {
    return appointments.filter(
      (appointment) => new Date(appointment.eventDate).toDateString() === date.toDateString()
    );
  };

  const renderCells = () => {
    return days.map((day, index) => {
      const dayAppointments = day ? getAppointmentsForDay(day.date) : [];

      return (
        <div
          key={index}
          className={`relative flex items-start justify-start min-h-[80px] border border-gray-300 text-left ${
            day && isToday(day.date) ? "border-2 border-red-500" : ""
          }`}
          onClick={day ? () => onDateClick(day.date) : null}
        >
          {day && (
            <div>
              <div className="absolute top-2 left-2 text-sm font-bold text-gray-700">
                {format(day.date, "d")}
              </div>
              <div className="absolute top-8 left-2 text-xs text-gray-500">
                {dayAppointments.length} {dayAppointments.length === 1 ? "appointment" : "appointments"}
              </div>
            </div>
          )}
          {day && <AppointmentList day={day.date} appointments={dayAppointments} />}
        </div>
      );
    });
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
