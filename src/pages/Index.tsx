import { ChatLog } from "@/components/Chat/ChatLog";
import { NewsFeed } from "@/components/NewsFeed";
import { Card } from "@/components/ui/card";
import { Premium } from "@/components/Premium";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 backdrop-blur-sm bg-glass-background border-glass-border">
              <h1 className="text-2xl font-semibold mb-6">
                AI Infinite Dialogue
              </h1>
              <ChatLog />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Premium />
              <NewsFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
