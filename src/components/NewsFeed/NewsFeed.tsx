
import { Card } from "@/components/ui/card";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: "1",
    title: "Latest Developments in AI Research",
    source: "AI Journal",
    url: "#",
  },
  {
    id: "2",
    title: "Understanding Neural Networks",
    source: "Tech Review",
    url: "#",
  },
];

export const NewsFeed = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Latest News</h2>
      <div className="space-y-3">
        {NEWS_ITEMS.map((item) => (
          <Card key={item.id} className="p-4 backdrop-blur-sm bg-glass-background border-glass-border">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Source: {item.source}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
