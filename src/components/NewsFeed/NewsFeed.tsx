import { useEffect, useState } from "react";
import { fetchNews } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const { news: fetchedNews, error: fetchError } = await fetchNews();
        setNews(fetchedNews);
        setError(fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  if (isLoading) {
    return <div className="p-4">Loading news...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!news.length) {
    return <div className="p-4">No news available at the moment.</div>;
  }

  return (
    <Card className="p-6 backdrop-blur-sm bg-glass-background border-glass-border">
      <div className="space-y-4 p-4">
        <h2 className="text-xl font-semibold mb-4">AI News</h2>
        {news.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(item.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </Card>
  );
}
