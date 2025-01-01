"use client";

import { useState, useEffect, useRef } from "react";

const ChatCard = ({ chatId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionId, setSessionId] = useState(null); // Store session ID
  const ws = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket("ws://localhost:1234/ws"); // Replace with your actual WebSocket URL

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    // Handle messages from server
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // Handle session ID message
      if (message.sessionId) {
        setSessionId(message.sessionId);
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
  }, []);

  // Function to send a new message via HTTP request
  const sendMessage = async () => {
    if (newMessage.trim() === "" || !sessionId) return;

    // Construct the HTTP request URL with query parameters
    const requestUrl = `http://localhost:1234/send?user_id=${userId}&chat_id=${chatId}&text=${encodeURIComponent(
      newMessage
    )}&session_id=${sessionId}`;

    try {
      const response = await fetch(requestUrl, {
        method: "POST",
      });

      if (!response.ok) {
        console.error("Failed to send message:", response.status);
        throw new Error("Failed to send message");
      } else {
        console.log("Message sent successfully:", newMessage);
      }
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
