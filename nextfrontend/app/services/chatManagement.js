const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

// const WebSocket = require('ws');
let wsInstance; // This will hold the WebSocket instance

//* This function initializes the Websocket if none is created
export const initializeWebSocket = (chatId, setMessages) => {
  // Create a new WebSocket connection if not already established
  if (!wsInstance) {
    wsInstance = new WebSocket('ws://geyser.sytes.net:1234/ws/messages'); // Replace with your WebSocket URL

    // Handle incoming messages
    wsInstance.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.chat_id === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    // Handle connection errors
    wsInstance.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on connection close
    wsInstance.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  return wsInstance; // Return the WebSocket instance
};

//* Outsourced function from ChatCard for 
//* sending messages on 
export default async function sendMessage(user_id, chat_id, text) {
  try {
    const response = await fetch(`${baseUrl}/main/send?userId=${user_id}&chatId=${chat_id}&text=${text}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    // if the response is ok, than it should display the message 
    // that is saved in ChatCard
    return response;
  } catch (error) {
    console.error('Error sending message via HTTP:', error);
  }
};

export async function registerchat(user_id, session_id) {
  const response = await fetch(
    `${baseUrl}/chat/register?userId=${user_id}&sessionId=${session_id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response;
}

export async function createChat(user_id, other_user_id) {
  const response = await fetch (
    `${baseUrl}/chat/create?userId=${user_id}&otherUserId=${other_user_id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json"}
    }
  )
  if (!response.ok) {
    throw new Error("Failed to create Chat");
  }

  return response;
}

export async function getChats(user_id) {
  const response = await fetch(
    `${baseUrl}/chat/chats?userId=${user_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json"}
    }
  )
  if (!response.ok) {
    throw new Error("Failed to get chats");
  }

  return response;
}