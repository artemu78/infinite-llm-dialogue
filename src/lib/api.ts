import { API_URL } from "@/config";
import { type ChatMessage } from "@/lib/utils";
export interface ChatResponse {
  message: string;
  id: string;
  datetime: number;
  sender: string;
}

export interface ChatRequest {
  message: string;
  // Add other request fields as needed
}

export async function getChat(request: ChatRequest): Promise<ChatMessage[]> {
  try {
    const response = await fetch(`${API_URL}/getchat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
