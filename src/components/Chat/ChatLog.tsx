import { useState, useEffect } from "react";
import { Message } from "./Message";

import { aiRequest, type ChatMessage } from "@/lib/utils";
import { getUserName } from "@/lib/userUtils";
import { getChat } from "@/lib/api";

const userName = getUserName();

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchInitialChat = async () => {
      try {
        const response = await getChat({});
        setMessages(response);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchInitialChat();
  }, []); // Empty dependency array means this runs once on component mount

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      content: inputMessage,
      sender: userName,
      timestamp: new Date().getTime(),
    };

    const loadingMessage: ChatMessage = {
      id: new Date().getTime(),
      content: "Thinking...",
      sender: "System",
      timestamp: new Date().getTime(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      const aiResponses = await aiRequest(inputMessage, userName);
      setMessages((prev) => {
        // Remove the loading message and add all AI responses
        const withoutLoading = prev.filter(
          (msg) => msg.id !== loadingMessage.id
        );
        return [...withoutLoading, ...aiResponses];
      });
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
    }

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div>
      <div className="space-y-6 py-6 max-h-[60vh] overflow-y-auto">
        {messages.map((message, index) => (
          <Message key={message.id + index} {...message} />
        ))}
      </div>
      <div className="mt-6 flex space-x-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message (1 free message per day)"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
        <button
          onClick={handleSendMessage}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};
