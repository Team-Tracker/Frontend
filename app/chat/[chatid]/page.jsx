"use client"

import ChatCard from '../../components/Chat/ChatCard';

const ChatDetailPage = ({ params }) => {

  // get the params needed to display the chat
  const { chatid } = params; // Extract chat ID from the URL
  const userid = getCookie('userId');

  // displays the Chat with the specific parameters
  return (
      <ChatCard chatId={chatid} userId={userid} />
  );
};


const getCookie = (name) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

export default ChatDetailPage;
