import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";
import ReactMarkdown from "react-markdown";
import { type ChatMessage } from "@/lib/utils";

interface MessageProps extends ChatMessage {
  isLoading?: boolean;
}

export const Message = ({
  content,
  sender,
  timestamp,
  isLoading,
}: MessageProps) => {
  let formattedDate = timestamp.toString();
  if (typeof timestamp === "number") {
    const date = new Date(timestamp);
    formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <div className="flex items-start space-x-3 animate-fade-up">
      <Avatar name={sender} color="1" />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{sender}</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="mt-1 text-gray-800">
          {isLoading ? (
            <span className="inline-flex items-center">
              <span className="animate-bounce">.</span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                .
              </span>
              <span
                className="animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                .
              </span>
            </span>
          ) : (
            <ReactMarkdown className="prose prose-sm">{content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
