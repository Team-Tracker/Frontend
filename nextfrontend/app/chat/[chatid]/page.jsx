"use client"

import ChatCard from '../../components/ChatCard';

const ChatDetailPage = ({ params }) => {

  // get the params needed to display the chat
  const { chatid } = params; // Extract chat ID from the URL
  const userid = 1;

  // displays the Chat with the specific parameters
  return (
      <ChatCard chatId={chatid} userId={userid} />
  );
};

export default ChatDetailPage;
