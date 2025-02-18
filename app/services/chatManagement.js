const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function initWebSocket(url) {}

export async function sendMessage(user_id, chat_id, text) {
  try {
    const response = await fetch(
      `${baseUrl}/message/send?userId=${user_id}&chatGroupId=${chat_id}&text=${text}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    // if the response is ok, than it should display the message
    // that is saved in ChatCard
    return response;
  } catch (error) {
    console.error("Error sending message via HTTP:", error);
  }
}

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

export async function createChat(user_id, other_user_ids) {
  const responseChannel = await fetch(
    `${baseUrl}/chat/createMono?userId=${user_id}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!responseChannel.ok) {
    throw new Error("Failed to create Chat");
  }

  const createdChatId = await responseChannel.json();

  if (Array.isArray(other_user_ids[0])) {
    other_user_ids = other_user_ids[0];
  }

  await Promise.all(
    other_user_ids.map(async (other_user_id, index) => {
      console.log("Adding user ID: ", other_user_id);
      const responseAddUserToGroup = await fetch(
        `${baseUrl}/chat/add?chatGroupId=${createdChatId}&userId=${other_user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!responseAddUserToGroup.ok) {
        throw new Error("Failed to add User to the chat");
      }
    })
  );
  return responseChannel;
}

export async function getChats(user_id) {
  const response = await fetch(`${baseUrl}/chat/chats?userId=${user_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to get chats");
  }

  return response;
}

export async function loadMessages(group_id) {
  const response = await fetch(
    `${baseUrl}/message/messagesChat?chatGroupId=${group_id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to load previous messages");
  }

  return response;
}
