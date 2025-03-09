import { useAtom } from 'jotai';
import { userAtom } from "@/lib/atoms";
import { useEffect, useState } from "react";
import { fetchNews } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface NewsItem {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

export function NewsFeed() {
  const [user] = useAtom(userAtom);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const { news: fetchedNews, error: fetchError } = await fetchNews(user);
        setNews(fetchedNews);
        setError(fetchError);
      } finally {
        setIsLoading(false);
      }
    };

    user && getNews();
  }, [user]);

  if (isLoading && user) {
    return (<div className="flex justify-center items-center py-6">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>);
  }

  if (!user) {
    return <div className="p-4 text-gray-500">Please log in to see news</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!news.length) {
    return <div className="p-4">No news available at the moment.</div>;
  }

  return (
    <Card className="py-4 backdrop-blur-sm bg-glass-background border-glass-border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="px-4">
          <div className="flex items-center justify-between">
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h2 className="text-xl font-semibold">AI News</h2>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""
                  }`}
              />
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="mt-4">
            <article className="space-y-4">
              {news.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-4 border-t hover:bg-gray-50 transition-colors"
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
            </article>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </Card>
  );
}
