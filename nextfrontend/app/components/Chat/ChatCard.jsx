"use client";

import { useState, useEffect, useRef } from "react";
import sendMessage, { registerchat } from "@/app/services/chatManagement";

const ChatCard = ({ chatId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket("ws://lgeyser.duckdns.org:8443/ws"); // Replace with your actual WebSocket URL

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    // Handle messages from server
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.sessionId) {
        setSessionId(message.sessionId);
        registerchat(userId, sessionId)
        console.log("Session ID received:", message.sessionId);
      } else {
        // Handle chat messages
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [userId]); // Dependency on userId for potential future use

  const send = async () => {
    try {
      const response = await sendMessage(userId, chatId, newMessage);

      if (!response.ok) {
        console.error("Failed to send message:", response.status);
        throw new Error("Failed to send message");
      } else {
        console.log("Message sent successfully:", newMessage);
      }

      setMessages((prevMessages) => [...prevMessages, { user_id: userId, text: newMessage }]);
      setNewMessage(""); // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[85vh]">
      <h2 className="text-xl font-semibold mb-4 table-fixed">Chat {chatId}</h2>
      <div className="flex-grow overflow-y-auto mb-4">
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <li key={index} className="mb-2">
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
          onClick={send}
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatCard;
