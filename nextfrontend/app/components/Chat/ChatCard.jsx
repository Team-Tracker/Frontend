"use client";

import { useState, useEffect, useRef } from "react";
// import { initializeWebSocket, sendMessageHttp } from '../services/chatManagement';

const ChatCard = ({ chatId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    //! Creating Websocket and message handling (will be updated later...)
    // ws.current = initializeWebSocket(chatId, setMessages);

    // Establish WebSocket connection
    ws.current = new WebSocket("ws://localhost:1234/ws/messages"); // Replace with your actual WebSocket URL

    // Handle messages from server
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.chat_id === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [chatId]);

  // Function to send a new message
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageObj = {
      user_id: userId,
      chat_id: chatId,
      text: newMessage,
    };

    //! Outsourced function
    //? response = await sendMessageHttp(messageObj);
    //? if(response.ok) {
    //?   displayMessage(messageObj)
    //? }
    //

    const response = await fetch(
      `http://geyser.sytes.net:1234/send?user_id=${userId}&chat_id=${chatId}&text=${newMessage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log(response.status);
      throw new Error("Failed to send message");
    } else {
      // displayMessage(messageObj)
    }
    setNewMessage(""); // Clear input after sending
  };

  const handleFileUploadClick = async () => {
    console.log("Uploading your file...");
  };

  return (
    <div className="flex flex-col h-full max-h-[85vh]">
      {/* Increased height */}
      <h2 className="text-xl font-semibold mb-4 table-fixed">Chat {chatId}</h2>
      <div className="flex-grow overflow-y-auto mb-4">
        <ul className="space-y-2">
          {messages.map((message) => (
            <li key={message.id} className="mb-2">
              <strong>User {message.user_id}:</strong> {message.text}
            </li>
          ))}
        </ul>
      </div>
      {/* Input Bar at the Bottom */}
      <div className="flex items-center border-t p-4 table-fixed">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="border p-2 rounded flex-grow text-black"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatCard;
