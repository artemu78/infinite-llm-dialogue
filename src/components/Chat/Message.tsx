
import { cn } from "@/lib/utils";
import { Avatar } from "./Avatar";

interface MessageProps {
  content: string;
  sender: {
    name: string;
    color: "1" | "2" | "3";
  };
  timestamp: string;
}

export const Message = ({ content, sender, timestamp }: MessageProps) => {
  return (
    <div className="flex items-start space-x-3 animate-fade-up">
      <Avatar name={sender.name} color={sender.color} />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{sender.name}</span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
        <p className="mt-1 text-gray-800">{content}</p>
      </div>
    </div>
  );
};
