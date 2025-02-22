import { cn } from "@/lib/utils";
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary";

interface AvatarProps {
  name: string;
  color: "1" | "2" | "3";
}

const AvatarRaw = ({ name, color }: AvatarProps) => {
  return (
    <ErrorBoundary>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-llm-" +
            color
        )}
      >
        {name[0]?.toUpperCase()}
      </div>
    </ErrorBoundary>
  );
};

export const Avatar = (props: AvatarProps) => {
  return (
    <ErrorBoundary
      fallback={
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-gray-200"
          )}
        >
          ?
        </div>
      }
    >
      <AvatarRaw {...props} />
    </ErrorBoundary>
  );
};
