"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getChats } from '../services/chatManagement';
import AddChatPopUp from '../components/Chat/AddChatPopUp';
import fetchUsers from "@/app/services/saveUsers"; // import fetchUsers


const ChatList = () => {
  const router = useRouter();

  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [user_Id, setUserId] = useState(null);

  useEffect(() => {
    const userId = getCookie('userId');
    setUserId(userId)


    const fetchChats = async () => {
      try {
        if (userId) {
          const response = await getChats(userId); 

          if (response.ok) {
            const fetchedChats = await response.json();
            setChats(fetchedChats);
          } else {
            console.error('Error fetching chats:', response.statusText);
          }
        } else {
          console.error('User ID not found in cookies.');
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    const getUsers = async () => {
      try {
        if (userId) {
          const fetchedUsers = await fetchUsers(userId);

          console.log("Users from the service: ", fetchedUsers)
          
          if(Array.isArray(fetchedUsers)) {
            setUsers(fetchedUsers);
            console.log("Users: ", users);
          } else {
            console.error('Error fetching other users:', fetchedUsers.statusText);
          }
        } else {
          console.error('User ID not found in cookies.');
        }
      } catch {
        console.error('Error fetching other users:', error);
      }
    };

    getUsers();
    fetchChats();
  }, []); 

  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  const addNewChat = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-semibold">Chats</h1>
        <div className='p-2 bg-black-500 text-white text-2xl rounded hover:bg-black-800'>
          <AddChatPopUp onAddChat={addNewChat} users={users} userId={user_Id} />
        </div>
      </div>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            className="text-white cursor-pointer hover:bg-gray-500 p-4 rounded-lg transition duration-200 ease-in-out"
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;

