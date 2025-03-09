import { API_URL } from "@/config";
import { type ChatMessage } from "@/lib/utils";
export interface ChatResponse {
  message: string;
  id: string;
  datetime: number;
  sender: string;
}
import type { User } from "@/lib/types";

export interface ChatRequest {
  message?: string;
  // Add other request fields as needed
}

export async function getChat(request: ChatRequest, user: User): Promise<ChatMessage[]> {
  try {
    const response = await fetch(`${API_URL}/getchat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data?.map((chatItem: ChatResponse) => {
      const { message, datetime, ...rest } = chatItem;

      return { ...rest, content: message, timestamp: datetime };
    });
  } catch (error) {
    console.error("Failed to get chat response:", error);
    throw error;
  }
}
