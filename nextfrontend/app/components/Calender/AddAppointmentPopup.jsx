"use client";
// /components/Calendar/AppointmentPopup.js
import { useState } from "react";
import { HStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Input, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
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

export default function AddAppointmentPopup({ onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [members, setMembers] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle appointment save logic here
    onClose(); // Close the popup after saving
  };

  /**
   * TODO: A request to get the members
   *
   */
  const names = {
    items: [
      { label: "Joe", value: "Joe" },
      { label: "Bo Dallas", value: "Bo Dallas" },
      { label: "Testuser2", value: "Testuser2" },
      { label: "Testdev1", value: "Testdev1" },
    ],
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

              <Field label="Time" errorText="This is not a valid time">
                <Input
                  placeholder="Time"
                  size="md"
                  type="time"
                  color="black"
                  onChange={(e) => setTime(e.target.value)}
                  className="mb-4 p-2 border border-black rounded-md text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                />
              </Field>

              <Field label="Members">
                <Input
                  placeholder="Members"
                  size="md"
                  type="text"
                  color="black"
                  onChange={(e) => setMembers(e.target.value)}
                  className="mb-4 p-2 border border-black rounded-md text-sm transition-colors duration-300 focus:border-blue-500 focus:outline-none"
                />
              </Field>

              {/* <SelectRoot
                key="Members"
                variant="subtle"
                multiple="true"
                items={names}
              >
                <SelectLabel>Select Members</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Select members" />
                </SelectTrigger>
                <SelectContent>
                  {names.items.map((name) => (
                    <SelectItem item={name} key={name.value}>
                      {name.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot> */}

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
              <Button variant="outline" className="mr-2 bg-gray-900 hover:bg-gray-400">
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
