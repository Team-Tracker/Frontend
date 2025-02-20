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

export default function CalendarTable({ viewMode, onDateClick, selectedDate }) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const cookie = getCookie("userId");
        const response = await getAssignments(cookie);
        if (!response.ok) throw new Error("Failed to fetch appointments");

        const data = await response.json();
        console.log("JSON Response: ", data);
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setAppointments(getStaticAppointments());
      }
    };

    const getCookie = (name) => {
      if (typeof document === "undefined") return null;
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    fetchAppointments();
  }, [selectedDate]);

  const getStaticAppointments = () => {
    return [
      {
        title: "Team Meeting",
        date: "2025-01-22",
        time: "10:00 AM",
        members: ["Alice", "Bob", "Charlie"],
        description: "Discuss project updates and deadlines.",
      },
      {
        title: "Doctor Appointment",
        date: "2025-01-23",
        time: "3:00 PM",
        members: [],
        description: "Routine check-up.",
      },
      {
        title: "Dentist Appointment",
        date: "2025-01-23",
        time: "5:00 PM",
        members: [],
        description: "Routine check-up.",
      },
      {
        title: "Workshop",
        date: "2025-01-24",
        time: "1:00 PM",
        members: ["David", "Eve"],
        description: "Attend workshop on advanced JavaScript.",
      },
    ];
  };

  useEffect(() => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const daysInMonth = eachDayOfInterval({ start, end }).map((day) => ({
      date: day,
      displayDate: format(day, "d"),
    }));

    // Calculate padding for days before the start of the month
    const firstDayIndex = (getDay(start) + 6) % 7; // Adjust to make Monday = 0, ... , Sunday = 6
    const paddedDays = Array(firstDayIndex).fill(null).concat(daysInMonth);
    setDays(paddedDays);
  }, [selectedDate]);

  
  const getAppointmentsForDay = (date) => {
    return appointments.filter(
      (appointment) =>
        new Date(appointment.eventDate).toDateString() === date.toDateString()
    );
  };

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
          {day && (
            <AppointmentList day={day.date} appointments={dayAppointments} />
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-900 p-4">
      <div className="grid grid-cols-7 border-b-4 border-gray-700 bg-white text-black pb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="font-bold p-3 text-center bg-white text-black"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 mt-4 bg-gray-100">
        {renderCells()}
      </div>
    </div>
  );
}
