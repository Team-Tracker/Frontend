"use client";

import { useState, useEffect, useRef } from "react";
import { sendMessage, registerchat, loadMessages } from "@/app/services/chatManagement";
import { getUserName } from "@/app/services/userinfo";


const ChatCard = ({ chatId, userId }) => {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [userNames, setUserNames] = useState({});
  const [loadingPreviousMessages, setLoadingPreviousMessages] = useState(true);

  useEffect(() => {
    // Turn off AddBlocker
    const socket = new WebSocket("wss://lgeyser.duckdns.org:8443/ws");
    wsRef.current = socket;

    socket.addEventListener("message", (event) => {
      console.log(event.data);
    });

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log("Saved UserID: ", userId);
      console.log("Message recieved form socket: ", message);

      if (message.sessionId) {
        setSessionId(message.sessionId);
        await registerchat(userId, message.sessionId);

        if(loadingPreviousMessages) {
          try {
            const respOldMessages = await loadMessages(chatId);
            if (!respOldMessages.ok) {
              console.error("Failed to get old messages:", respOldMessages.status);
              throw new Error("Failed to get old messages");
            } else {
              const respJSONOldMessages = await respOldMessages.json();
              setMessages(respJSONOldMessages)
              // console.log("Messages recieved successfully:", respJSONOldMessages);
              setLoadingPreviousMessages(false);
            }
          } catch (err){
            console.error("Error fetching old messages: ", err);
          }
        }
      } else {
        if (!userNames[message.userid]) {
          try {
            const response = await getUserName(message.userid);
            const username = await response.text();
            console.log("Result: ", userNames[message.userid]);

            setUserNames((prev) => ({ ...prev, [message.userid]: username }));
            console.log("Users: ", userNames);
          } catch (err) {
            console.error("Error fetching username:", err);
          }
        }
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [userId]);

  const send = async () => {
    try {
      const response = await sendMessage(userId, chatId, newMessage);

      if (!response.ok) {
        console.error("Failed to send message:", response.status);
        throw new Error("Failed to send message");
      } else {
        console.log("Message sent successfully:", newMessage);
      }

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col flex-grow h-full max-h-[85vh] p-4">
      <h2 className="text-xl font-semibold mb-4 table-fixed">Chat {chatId}</h2>
      <div className="flex-grow overflow-y-auto mb-4">
        <ul className="space-y-2">
          {messages.map((message, index) => {
            console.log("Type of userId:", typeof userId, "Value:", userId);
            console.log(
              "Type of message.userid:",
              typeof message.userid,
              "Value:",
              message.userid
            );

            const isOwnMessage = Number(message.userid) === Number(userId);
            console.log("Compare: ", isOwnMessage);
            const username = userNames[message.userid] || "Loading...";

            return (
              <li
                key={index}
                className={`mb-2 flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-2 rounded shadow-md max-w-xs break-words text-white ${
                    isOwnMessage
                      ? "bg-blue-500 text-right"
                      : "bg-gray-500 text-left"
                  }`}
                >
                  <strong className="block mb-1">
                    {isOwnMessage ? "You" : username}
                  </strong>
                  {message.text}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Input Bar at the Bottom */}
      <div className="flex items-center border-t p-4 table-fixed">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="border p-2 rounded flex-grow text-white"
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
