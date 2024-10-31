"use client";
// /components/Calendar/Calendar.js
import { useState } from "react";
import { startOfMonth } from "date-fns";

import CalendarMenu from "./CalendarMenu";
import CalendarTable from "./CalendarTable";
import AppointmentPopup from "./AppointmentPopup";
import AppointmentListPopup from "./AppointmentListPopup";

export default function Calendar() {
  const [viewMode, setViewMode] = useState("month"); // Toggle between 'month' and 'week'
  const [showaddPopup, setShowAddPopup] = useState(false);
  const [showdetailPopup, setShowDetailPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfMonth(new Date()));

  return (
      <div className="Calendar">
        <div className="Menu">
          <CalendarMenu
            viewMode={viewMode}
            setViewMode={setViewMode}
            onAdd={() => setShowAddPopup(true)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="Body">
          <CalendarTable
            viewMode={viewMode}
            onDateClick={() => setShowDetailPopup(true)}
            selectedDate={selectedDate}
          />
        </div>
        {showaddPopup && (
          <AppointmentPopup onClose={() => setShowAddPopup(false)} />
        )}
        {showdetailPopup && (
          <AppointmentListPopup onClose={() => setShowDetailPopup(false)} />
        )}
      </div>
  );
}
