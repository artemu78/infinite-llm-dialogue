import { API_URL } from "@/config";

export interface ChatResponse {
  message: string;
  // Add other response fields as needed
}

export interface ChatRequest {
  message: string;
  // Add other request fields as needed
}

export async function getChat(request: ChatRequest): Promise<ChatResponse> {
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
    return data as ChatResponse;
  } catch (error) {
    console.error("Failed to get chat response:", error);
    throw error;
  }
}
