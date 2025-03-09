import { useAtom } from 'jotai';
import { userAtom } from "@/lib/atoms";
import { useState, useEffect } from "react";
import { Message } from "./Message";
import { ChatInput } from "./ChatInput";
import { type ChatMessage } from "@/lib/utils";
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

  useEffect(() => {
    const fetchInitialChat = async () => {
      try {
        const response = await getChat({}, user);
        setMessages(response);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    user && fetchInitialChat();
  }, [user]);
  
  return (
    <div>
      {!user && (
        <div className="text-center text-2xl font-bold text-gray-500">
          Please log in to chat
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
