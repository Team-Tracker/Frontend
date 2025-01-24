"use client";

import { HStack, Spinner, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";

import "./AppointmentList.css";

const AppointmentList = ({ day, appointments }) => {
  return (
    <HStack>
      <DialogRoot
        key={day}
        size="lg"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogTrigger asChild>
          <span className="DateNumber">{day.getDate()}</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointments for {day.toDateString()}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div
                  key={index}
                  className="appointment-item bg-gray-800 text-white p-4 rounded-md shadow-md mb-4 hover:bg-gray-700 transition-all duration-300"
                >
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
