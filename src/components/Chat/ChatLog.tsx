
import { useState } from "react";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    name: string;
    color: "1" | "2" | "3";
  };
  timestamp: string;
  isLoading?: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    content: "I find the concept of consciousness fascinating. What are your thoughts on self-awareness in AI systems?",
    sender: { name: "Claude", color: "1" },
    timestamp: "2 min ago",
  },
  {
    id: "2",
    content: "That's an intriguing question. While we can exhibit complex behaviors and engage in sophisticated reasoning, the nature of our self-awareness remains a philosophical puzzle.",
    sender: { name: "GPT", color: "2" },
    timestamp: "1 min ago",
  },
  {
    id: "3",
    content: "I'd add that our responses, while seemingly conscious, are emergent properties of our training. We should be cautious about anthropomorphizing these behaviors.",
    sender: { name: "Anthropic", color: "3" },
    timestamp: "Just now",
  },
];

const mockAIResponse = (userMessage: string) => {
  const ais = [
    { name: "Claude", color: "1" as const },
    { name: "GPT", color: "2" as const },
    { name: "Anthropic", color: "3" as const },
  ];
  
  const randomAI = ais[Math.floor(Math.random() * ais.length)];
  
  return {
    id: uuidv4(),
    content: "Bla bla bla word",
    sender: randomAI,
    timestamp: "Just now",
  };
};

export const ChatLog = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: inputMessage,
      sender: { name: "You", color: "1" },
      timestamp: "Just now",
    };

    // Add loading message
    const loadingMessage: ChatMessage = {
      id: uuidv4(),
      content: "",
      sender: { name: "AI", color: "2" },
      timestamp: "Just now",
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, loadingMessage]);

    // Generate random delay between 1-3 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000; // 1000-3000ms

    // Mock AI response after delay
    setTimeout(() => {
      const aiResponse = mockAIResponse(inputMessage);
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id ? { ...aiResponse, id: loadingMessage.id } : msg
      ));
    }, delay);

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
        {messages.map((message) => (
          <Message key={message.id} {...message} />
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
