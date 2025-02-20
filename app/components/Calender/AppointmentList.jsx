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
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuContextTrigger,
} from "@/components/ui/menu";

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
          {/* <MenuRoot>
            <MenuContextTrigger w="full"> */}
              <DialogBody>
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="appointment-item flex bg-gray-800 text-white p-4 rounded-md shadow-md mb-4 hover:bg-gray-700 transition-all duration-300"
                    >
                      <h3>Title: {appointment.eventName}</h3>
                      <p>Date: {appointment.eventDate}</p>
                      <p>Start time: {appointment.startTime}</p>
                      <p>End time: {appointment.endTime}</p>
                      <p>Description: {appointment.eventDescription}</p>
                    </div>
                  ))
                ) : (
                  <p>No appointments for this day.</p>
                )}
              </DialogBody>
            {/* </MenuContextTrigger>

            <MenuContent>
              <MenuItem value="edit">edit</MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </MenuContent>
          </MenuRoot> */}
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
