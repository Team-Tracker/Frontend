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

import { createChat } from "@/app/services/chatManagement";

export default function AddChatPopUp({ onAddChat, users, userId }) {
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const contentRef = useRef(null);

  const usersCollection = createListCollection({
    items: users.map((user) => ({
      label: user.username, 
      value: user.id, 
    })),
  });


  // Handle form submission (add new chat)
  const addChat = async (e) => {
    e.preventDefault();

    console.log("Submited selected users: ", selectedUsers)
    const submitChat = await createChat(userId, selectedUsers)

    if(!submitChat.ok) {
      console.log("Error creating chat...");
    }
  };

  // Handle user selection toggling
  const handleUserSelect = (userId) => {
    console.log("Test :)");
    setSelectedUsers((prevSelected) => {
      const updatedUsers = prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId) // Deselect user
        : [...prevSelected, userId]; // Select user

      console.log("Updated Selected Users: ", updatedUsers);
      return updatedUsers;
    });
    console.log("SelectedUsers: ", selectedUsers)
  };


  // Get selected user names to display in SelectValueText
  const selectedUserNames = selectedUsers
    .map((userId) => {
      const user = users.find((user) => user.id === userId);
      return user ? user.username : null;
    })
    .filter(Boolean);


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
            <SelectRoot
              multiple
              collection={usersCollection}
              size="sm"
              onValueChange={(newValues) => {
                console.log("New selected values:", newValues); // Debugging log
                const selected = Array.isArray(newValues) ? newValues.map((newValue) => newValue.value) : [newValues.value];
                console.log("Selected Users: ", selected)

                setSelectedUsers(selected)
              }}
            >
              <SelectLabel>Adding Members</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select members" />
              </SelectTrigger>
              <SelectContent portalRef={contentRef}> {/* Pass the ref here */}
                {usersCollection.items.map((item) => (
                  <SelectItem
                    key={item.value}
                    item={item}
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
              onClick={addChat}
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
