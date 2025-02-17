
import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  color: "1" | "2" | "3";
}

export const Avatar = ({ name, color }: AvatarProps) => {
  return (
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-llm-" + color
      )}
    >
      {name[0].toUpperCase()}
    </div>
  );
};
