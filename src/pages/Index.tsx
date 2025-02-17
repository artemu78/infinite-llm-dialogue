
import { ChatLog } from "@/components/Chat/ChatLog";
import { NewsFeed } from "@/components/NewsFeed/NewsFeed";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 backdrop-blur-sm bg-glass-background border-glass-border">
              <h1 className="text-2xl font-semibold mb-6">AI Infinite Dialogue</h1>
              <ChatLog />
              <div className="mt-6 flex space-x-4">
                <Input
                  placeholder="Type your message (1 free message per day)"
                  className="flex-1"
                />
                <Button>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Premium Features Card */}
              <Card className="p-6 backdrop-blur-sm bg-glass-background border-glass-border">
                <h2 className="text-lg font-semibold mb-4">Upgrade to Premium</h2>
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
                <Button className="w-full mt-4">Upgrade Now</Button>
              </Card>

              {/* News Feed */}
              <Card className="p-6 backdrop-blur-sm bg-glass-background border-glass-border">
                <NewsFeed />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
