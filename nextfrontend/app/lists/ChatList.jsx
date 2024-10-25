"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ChatList = () => {
  const router = useRouter();
  const [chats, setChats] = useState([
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' },
  ]);


  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`); // Redirect to /chat/[chatid]
  };

  const handleAddChat = () => {
    console.log("Adding new chat...")
    // setChats([...chats, {id: 4, name: 'Chat 4'}])
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Chats</h1>
        <button
          onClick={() => handleAddChat()} 
          className='p-2 bg-black-500 text-white text-2xl rounded hover:bg-black-800'>
          +
        </button>
      </div>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className="cursor-pointer hover:bg-gray-500 p-4 rounded-lg transition duration-200 ease-in-out"
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
