"use client";

import { useState, useEffect } from "react";
import { HStack, Spinner, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "./AppointmentList.css";

const AppointmentList = ({ day }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`http://localhost:1234/calendar/`);
      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      const filteredAppointments = data.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate.getDate() === parseInt(day);
      });

      setAppointments(filteredAppointments);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      setAppointments(getStaticAppointments(day)); // Use static fallback
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [day]);

  const getStaticAppointments = (day) => {
    const staticData = [
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
        title: "Workshop",
        date: "2025-01-24",
        time: "1:00 PM",
        members: ["David", "Eve"],
        description: "Attend workshop on advanced JavaScript.",
      },
    ];

    return staticData.filter(
      (appointment) => new Date(appointment.date).getDate() === parseInt(day)
    );
  };

  return (
    <HStack>
      <DialogRoot
        key={day}
        size="lg"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogTrigger asChild>
          <span className="DateNumber">{day}</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Day {day}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {loading ? (
              <Spinner />
            ) : appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div key={index} className="appointment-item bg-gray-800 text-white p-4 rounded-md shadow-md mb-4 hover:bg-gray-700 transition-all duration-300">
                  <h3>{appointment.title}</h3>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Members: {appointment.members.join(", ") || "None"}</p>
                  <p>Description: {appointment.description}</p>
                </div>
              ))
            ) : (
              <p>No appointments for this day.</p>
            )}
            {/* loading ? (
              <Spinner />
            ) : error ? (
              <Text color="red.500">Failed to load appointments. Showing static data.</Text>
            ) : appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div key={index} className="appointment-item">
                  <h3>{appointment.title}</h3>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Members: {appointment.members.join(", ") || "None"}</p>
                  <p>Description: {appointment.description}</p>
                </div>
              ))
            ) : (
              <Text>No appointments for this day.</Text>
            ) */}
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Ok</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
};

export default AppointmentList;
