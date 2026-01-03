import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms";
import { useState, useEffect } from "react";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { type ChatMessage, checkChatMessages } from "@/lib/utils"; // Import checkChatMessages
import { getChat } from "@/lib/api";
import { set } from "date-fns";

// Helper function to assign colors to different personalities
const getColorForPersonality = (personality: string): "1" | "2" | "3" => {
  const colorMap: { [key: string]: "1" | "2" | "3" } = {
    counselor: "1",
    comedian: "2",
    captainObvious: "3",
  };
  return colorMap[personality] || "2";
};

export const ChatLog = () => {
  const [user] = useAtom(userAtom);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchChat = async () => {
      setLoading(true);
      try {
        const response = await getChat({}, user);
        setMessages(response);
        setOnlineStatus(true);
      } catch (error) {
        setOnlineStatus(false);
        console.error("Error fetching chat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
    const intervalId = setInterval(fetchChat, 5000); // Fetch every 5 seconds
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <div>
      {!user && (
        <div className="text-center text-2xl font-bold text-gray-500">
          Please log in to chat
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center py-6 sticky top-0">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      )}
      {messages.length === 0 && !loading && (
        <div className="text-center text-gray-500 py-6">
          No messages yet. Start the conversation!
        </div>
      )}
      {!onlineStatus && (
        <div className="text-center text-red-500 py-6">
          You are currently offline. Messages will be sent when you are back
          online.
        </div>
      )}
      <div className="space-y-6 py-6 max-h-[60vh] overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={message.id + index.toString()} {...message} />
        ))}
      </div>
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        setMessages={setMessages}
      />
    </div>
  );
};
