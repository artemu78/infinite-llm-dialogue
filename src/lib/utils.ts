import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL } from "@/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface ChatMessage {
  id?: number;
  content: string;
  sender: string;
  timestamp: number;
  isLoading?: boolean;
}

interface AIPersonalityResponse {
  personality: string;
  response: string;
}

interface AIResponse {
  responses: AIPersonalityResponse[];
}

const debugEnabled = process.env.NODE_ENV === "development";

export const aiRequest = async (
  userInput: string,
  userName: string
): Promise<ChatMessage[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput,
        userName,
        ...(debugEnabled && { debug: "true" }),
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: AIResponse = await response.json();

    // Transform the AI responses into ChatMessage format
    return data.responses.map((aiResponse: AIPersonalityResponse) => ({
      id: new Date().getTime(),
      content: aiResponse.response,
      sender: aiResponse.personality,
      timestamp: new Date().getTime(),
    }));
  } catch (error) {
    console.error("Error:", error);
    return [
      {
        id: new Date().getTime(),
        content: "Sorry, I couldn't process your request at this time.",
        sender: "System",
        timestamp: new Date().getTime(),
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
