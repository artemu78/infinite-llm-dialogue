import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface PremiumProps {
  className?: string;
}

export const Premium = ({ className }: PremiumProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpgrade = () => {
    toast.error("Not implemented. Please check back soon.", {
      closeButton: true,
      dismissible: true,
    });
  };

  return (
    <Card className={`${className || ""}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4 backdrop-blur-sm bg-glass-background border-glass-border">
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h2 className="text-lg font-semibold">Upgrade to Premium</h2>

            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4">
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                ✨ Unlimited messages
              </li>
              <li className="flex items-center text-sm">
                ✨ Direct control over chat flow
              </li>
              <li className="flex items-center text-sm">
                ✨ Advanced analytics
              </li>
            </ul>
            <button
              className="w-full mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              onClick={handleUpgrade}
            >
              Upgrade Now
            </button>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </Card>
  );
};
