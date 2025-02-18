
import { ChatLog } from "@/components/Chat/ChatLog";
import { NewsFeed } from "@/components/NewsFeed/NewsFeed";
import { Card } from "@/components/ui/card";

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
                <button className="w-full mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Upgrade Now
                </button>
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
