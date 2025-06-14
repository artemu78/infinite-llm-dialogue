import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL } from "@/config";
import type { User } from "@/lib/types";

// Utility function to check for "debug" URL parameter
export const isDebugMode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("debug");
};

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

export const aiRequest = async (
  userInput: string,
  userName: string,
  user?: User
): Promise<ChatMessage[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        userInput,
        userName,
        ...(isDebugMode() && { debug: "true" }),
      }),
    });
    const data: AIResponse = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        alert("You are being rate limited. Please try again later.\n");
      }
      throw new Error("Network response was not ok.");
    }

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

export const checkChatMessages = async (
  userName: string,
  user?: User
): Promise<ChatMessage[]> => {
  return aiRequest("", userName, user);
};

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

export const fetchNews = async (
  user: User
): Promise<{
  news: NewsItem[];
  error: string | null;
}> => {
  try {
    const response = await fetch(`${API_URL}/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        ...(isDebugMode() && { debug: "true" }),
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
