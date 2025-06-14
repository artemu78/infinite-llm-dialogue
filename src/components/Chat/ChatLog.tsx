import { useAtom } from 'jotai';
import { userAtom } from "@/lib/atoms";
import { useState, useEffect } from "react";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { type ChatMessage, checkChatMessages } from "@/lib/utils"; // Import checkChatMessages
import { getChat } from "@/lib/api";

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

  useEffect(() => {
    const fetchInitialChat = async () => {
      setLoading(true);
      try {
        const response = await getChat({}, user);
        setMessages(response);
      } catch (error) {
        console.error("Error fetching chat:", error);
      } finally {
        setLoading(false);
      }
    };

    user && fetchInitialChat();
  }, [user]);

  // useEffect for periodic message fetching
  useEffect(() => {
    if (!user) {
      return;
    }

    const determineUserName = () => {
      if (user.user_metadata?.user_name) {
        return user.user_metadata.user_name;
      }
      if (user.email) {
        return user.email;
      }
      return "User"; // Fallback username
    };

    const intervalId = setInterval(async () => {
      try {
        const userName = determineUserName();
        const newMessages = await checkChatMessages(userName, user);

        setMessages((prevMessages) => {
          const existingMessageIds = new Set(prevMessages.map(msg => msg.id).filter(id => id !== undefined));
          const trulyNewMessages = newMessages.filter(msg => msg.id === undefined || !existingMessageIds.has(msg.id));
          return [...prevMessages, ...trulyNewMessages];
        });

      } catch (error) {
        console.error("Error periodically fetching chat messages:", error);
      }
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount or user change
  }, [user]);
  
  return (
    <div>
      {!user && (
        <div className="text-center text-2xl font-bold text-gray-500">
          Please log in to chat
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center py-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
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
