"use client";
// /components/Calendar/AppointmentPopup.js
import { useState, useRef, useEffect } from "react";

import { HStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Input, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { createListCollection } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

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
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

import { createAssignment } from "@/app/services/calenderService";

export default function AddAppointmentPopup({ onClose, users, usersId, addAppointment }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [members, setMembers] = useState("");
  const [description, setDescription] = useState("");

  const [selectedUsers, setSelectedUsers] = useState([]);

  const contentRef = useRef(null);
  console.log("Users from PopUp: ", users);

  const usersCollection = createListCollection({
    items: users.map((user) => ({
      label: user.username,
      value: user.id,
    })),
  });

  // Handle user selection toggling
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cookie = getCookie("userId");
      const response = await createAssignment(cookie, title, description, date, startTime, endTime);

      const body = {
        "endTime": endTime,
        "eventDate": date,
        "eventDescription": description,
        "eventName": title,
        "startTime": startTime,
        "userId": cookie
      }

      addAppointment(body)

      if (!response.ok) {
        throw new Error(`Failed to save appointment: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Appointment saved successfully:", result);

      onClose();
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to save the appointment. Please try again.");
    }
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  return (
    <HStack>
      <DialogRoot
        key="add"
        size="lg"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <DialogTrigger asChild>
          <Button>+</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adding an Appointment</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="bg-white rounded-lg shadow-lg p-5 max-w-md mx-auto flex flex-col">
              <Field
                label="Title"
                errorText="This is not a valid email address"
              >
                <Input
                  placeholder="Title"
                  size="md"
                  type="text"
                  color="black"
                  onChange={(e) => setTitle(e.target.value)}
                  className="mb-4 p-2 border border-black rounded-md text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                />
              </Field>

              <Field label="Date" errorText="This is not a valid date">
                <Input
                  placeholder="Date"
                  size="md"
                  type="date"
                  color="black"
                  onChange={(e) => setDate(e.target.value)}
                  className="mb-4 p-2 border border-black rounded-md text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                />
              </Field>

              <Field label="StartTime" errorText="This is not a valid time">
                <Input
                  placeholder="StartTime"
                  size="md"
                  type="time"
                  color="black"
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mb-4 p-2 border border-black rounded-md text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                />
              </Field>

              <Field label="EndTime" errorText="This is not a valid time">
                <Input
                  placeholder="EndTime"
                  size="md"
                  type="time"
                  color="black"
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mb-4 p-2 border border-black rounded-md text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                />
              </Field>

              <SelectRoot
                multiple
                collection={usersCollection}
                size="sm"
                onValueChange={(newValues) => {
                  console.log("New selected values:", newValues); // Debugging log
                  const selected = Array.isArray(newValues)
                    ? newValues.map((newValue) => newValue.value)
                    : [newValues.value];
                  console.log("Selected Users: ", selected);

                  setSelectedUsers(selected);
                }}
              >
                <SelectLabel>Adding Members</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Select members" />
                </SelectTrigger>
                <SelectContent portalRef={contentRef}>
                  {" "}
                  {/* Pass the ref here */}
                  {usersCollection.items.map((item) => (
                    <SelectItem key={item.value} item={item}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>

              <Field label="Description">
                <Textarea
                  variant="outline"
                  placeholder="Description"
                  size="md"
                  color="black"
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4 p-2 border border-black rounded-md text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                />
              </Field>
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
                className="mr-2 bg-gray-900 hover:bg-gray-400"
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
