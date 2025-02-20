"use client";

import { useState, useEffect } from "react";
import { startOfMonth } from "date-fns";

import CalendarMenu from "./CalendarMenu";
import CalendarTable from "./CalendarTable";

import { useUsers } from "../../calender/ClientProvider";

export default function Calendar() {
  const [viewMode, setViewMode] = useState("month"); // Toggle between 'month' and 'week'
  const [showaddPopup, setShowAddPopup] = useState(false);
  const [showdetailPopup, setShowDetailPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfMonth(new Date()));
  const [userId, setUserId] = useState(null);


  const users = useUsers(); // Consume users from context

  useEffect(() => {
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
  
      const fetchData = async () => {
        const cookie = getCookie("userId");
        setUserId(cookie);
      }
  
      fetchData();
    }, []);

  return (
      <div className="flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <CalendarMenu
            viewMode={viewMode}
            setViewMode={setViewMode}
            onAdd={() => setShowAddPopup(true)}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            users={users}
          />
        </div>
        <div className="p-4">
          <CalendarTable
            viewMode={viewMode}
            onDateClick={() => setShowDetailPopup(true)}
            selectedDate={selectedDate}
            userId={userId}
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
