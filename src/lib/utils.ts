import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_URL =
  "https://qohnaiyyj2i5mjmfwzzqyta6ua0xixei.lambda-url.us-east-1.on.aws";

export interface ChatMessage {
  id: string;
  content: string;
  sender: {
    name: string;
    color: "1" | "2" | "3";
  };
  timestamp: string;
  isLoading?: boolean;
}

interface AIResponse {
  personality: string;
  response: string;
}
const debugEnabled = process.env.NODE_ENV === "development";

export const aiRequest = async (userMessage: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: userMessage,
        ...(debugEnabled && { debug: "true" }),
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Transform the AI responses into ChatMessage format
    return data.responses.map((aiResponse: AIResponse) => ({
      id: uuidv4(),
      content: aiResponse.response,
      sender: {
        name: aiResponse.personality,
        color: "2" as const,
      },
      timestamp: "Just now",
    }));
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

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

export const fetchNews = async (): Promise<{
  news: NewsItem[];
  error: string | null;
}> => {
  try {
    const response = await fetch(`${API_URL}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(debugEnabled && { debug: "true" }),
      }),
    });
    const data = await response.json();

    if (data.articles) {
      return {
        news: data.articles,
        error: null,
      };
    } else {
      return {
        news: [],
        error: data.errors?.[0] || "Failed to fetch news",
      };
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return {
      news: [],
      error: "Failed to fetch news",
    };
  }
};
