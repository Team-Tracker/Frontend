import { Rubik } from "next/font/google";

// components
import ChatList from "../lists/ChatList";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Chat",
  description: "Chats",
};


export default async function ChatLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Chat Sidebar */}
      <div className="chat-sidebar h-full bg-gray-900 fixed top-[64px] left-[256px] w-64 border-r border-gray-900">
        <ChatList />
      </div>

      {/* Chat Content Area */}
      <div className="ml-64 flex flex-col w-full h-screen">
        <div className="flex-grow overflow-y-auto p-4">
          {children}{" "}
          {/* This will render either the chat content or "No conversation selected" */}
        </div>
      </div>
    </div>
  );
}
