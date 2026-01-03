import { API_URL } from "@/config";
import { type ChatMessage } from "@/lib/utils";
export interface ChatResponse {
  message: string;
  id: string;
  datetime: number;
  sender: string;
}
import type { IUser } from "@/lib/types";

export interface ChatRequest {
  message?: string;
  // Add other request fields as needed
}

export async function getChat(
  request: ChatRequest,
  user: IUser
): Promise<ChatMessage[]> {
  try {
    if (user.access_token === "LOCALLY") {
      return [
        {
          sender: "sender",
          id: 0,
          timestamp: new Date().getTime(),
          content: "content",
        },
      ];
    }
    const response = await fetch(`${API_URL}/getchat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.access_token}`,
      },
      // Body is not allowed in GET requests
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
