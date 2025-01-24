"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { createListCollection } from "@chakra-ui/react";
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

export default function AddChatPopUp({ onAddChat, users }) {
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const contentRef = useRef(null);

  // Map users to a format compatible with Chakra UI Select
  const usersCollection = createListCollection({
    items: users.map((user) => ({
      label: user.username, // The display name for the user
      value: user.id, // The unique id for the user
    })),
  });

  // Handle form submission (add new chat)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (chatName.trim()) {
      const newChat = {
        id: Date.now(), // Generate a temporary unique ID
        name: chatName,
        members: selectedUsers,
      };

      onAddChat(newChat); // Notify parent component of the new chat
      setChatName(""); // Reset input
      setSelectedUsers([]); // Clear selected users
    }
  };

  // Handle user selection toggling
  const handleUserSelect = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId) // Deselect user
        : [...prevSelected, userId] // Select user
    );
    console.log("Selected users: ", selectedUsers)
  };

  // Get selected user names to display in SelectValueText
  const selectedUserNames = selectedUsers
    .map((userId) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.username : null;
    })
    .filter(Boolean); // Remove any null values


  return (
    <DialogRoot size="lg" placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button>+</Button>
      </DialogTrigger>

      <DialogContent ref={contentRef}>
        <DialogHeader>
          <DialogTitle>Add a New Chat</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <div className="bg-grey rounded-lg shadow-lg p-5 max-w-md mx-auto flex flex-col">
            <div className="mb-4">
              <label htmlFor="chatName" className="block text-gray-700 font-medium">
                Chat Name
              </label>
              <input
                id="chatName"
                type="text"
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                placeholder="Enter chat name"
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
              <SelectRoot multiple collection={usersCollection} size="sm">
                <SelectLabel>Adding Members</SelectLabel>
                <SelectTrigger>
                  <SelectValueText placeholder="Select members" />
                </SelectTrigger>
                <SelectContent portalRef={contentRef}> {/* Pass the ref here */}
                {usersCollection.items.map((item) => (
                  <SelectItem
                    key={item.value}
                    item={item}
                    onSelect={() => handleUserSelect(item.value)} // Correctly handle selection
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
              </SelectRoot>
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" className="mr-2 bg-gray-900 hover:bg-gray-400">
              Cancel
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button
              type="submit"
              onClick={handleSubmit} // Handle submit
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </Button>
          </DialogActionTrigger>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
