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
export const sendMessageHttp = async (messageObj) => {
  try {
    const response = await fetch(`http://geyser.sytes.net:1234/send?user_id=${messageObj.userId}&chat_id=${messageObj.chatId}&text=${messageObj.newMessage}`, {
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
    return response.status;
  } catch (error) {
    console.error('Error sending message via HTTP:', error);
  }
};
