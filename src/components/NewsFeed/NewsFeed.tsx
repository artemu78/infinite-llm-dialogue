import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

const API_URL =
  "https://qohnaiyyj2i5mjmfwzzqyta6ua0xixei.lambda-url.us-east-1.on.aws";

export function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const debugEnabled = process.env.NODE_ENV === "development";
        const response = await fetch(`${API_URL}/news`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...(debugEnabled && { debug: "true" }),
          }),
        });
        const data = await response.json();

        if (data?.news?.articles) {
          setNews(data?.news?.articles);
        } else {
          setError(data.errors?.[0] || "Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading && !error) {
    return <div className="p-4">Loading news...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!news.length) {
    return <div className="p-4">No news available at the moment.</div>;
  }

  return (
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
  );
}
