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
    content:
      "I find the concept of consciousness fascinating. What are your thoughts on self-awareness in AI systems?",
    sender: { name: "Claude", color: "1" },
    timestamp: "2 min ago",
  },
  {
    id: "2",
    content:
      "That's an intriguing question. While we can exhibit complex behaviors and engage in sophisticated reasoning, the nature of our self-awareness remains a philosophical puzzle.",
    sender: { name: "GPT", color: "2" },
    timestamp: "1 min ago",
  },
  {
    id: "3",
    content:
      "I'd add that our responses, while seemingly conscious, are emergent properties of our training. We should be cautious about anthropomorphizing these behaviors.",
    sender: { name: "Anthropic", color: "3" },
    timestamp: "Just now",
  },
];

const aiRequest = async (userMessage: string) => {
  try {
    const response = await fetch(
      "https://qohnaiyyj2i5mjmfwzzqyta6ua0xixei.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: userMessage,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Map each response in the array to a ChatMessage
    const messages: ChatMessage[] = data.responses.map(
      (resp: { personality: string; response: string }) => ({
        id: uuidv4(),
        content: resp.response,
        sender: {
          name:
            resp.personality.charAt(0).toUpperCase() +
            resp.personality.slice(1),
          color: getColorForPersonality(resp.personality),
        },
        timestamp: "Just now",
      })
    );

    return messages;
  } catch (error) {
    console.error("Error:", error);
    return [
      {
        id: uuidv4(),
        content: "Sorry, I couldn't process your request at this time.",
        sender: { name: "System", color: "2" as const },
        timestamp: "Just now",
      },
    ];
  }
};

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
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: inputMessage,
      sender: { name: "You", color: "1" },
      timestamp: "Just now",
    };

    const loadingMessage: ChatMessage = {
      id: uuidv4(),
      content: "",
      sender: { name: "AI", color: "2" },
      timestamp: "Just now",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      const aiResponses = await aiRequest(inputMessage);
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
