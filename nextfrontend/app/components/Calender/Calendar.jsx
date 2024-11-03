"use client";
// /components/Calendar/Calendar.js
import { useState } from "react";
import { startOfMonth } from "date-fns";

import CalendarMenu from "./CalendarMenu";
import CalendarTable from "./CalendarTable";

export default function Calendar() {
  const [viewMode, setViewMode] = useState("month"); // Toggle between 'month' and 'week'
  const [showaddPopup, setShowAddPopup] = useState(false);
  const [showdetailPopup, setShowDetailPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfMonth(new Date()));

  return (
      <div className="flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <CalendarMenu
            viewMode={viewMode}
            setViewMode={setViewMode}
            onAdd={() => setShowAddPopup(true)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="p-4">
          <CalendarTable
            viewMode={viewMode}
            onDateClick={() => setShowDetailPopup(true)}
            selectedDate={selectedDate}
          />
        </div>
        {/* {showaddPopup && (
          <AppointmentPopup onClose={() => setShowAddPopup(false)} />
        )} */}
        {/* {showdetailPopup && (
          <AppointmentListPopup onClose={() => setShowDetailPopup(false)} />
        )} */}
      </div>
  );
}
