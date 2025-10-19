import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  // Mock news data (replace with API fetch if needed)
  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        id: 1,
        title: "New Feature Released",
        description: "We have released a new payment feature for our users.",
        date: "2025-10-18",
      },
      {
        id: 2,
        title: "Maintenance Update",
        description:
          "Scheduled maintenance will occur on October 25th from 2 AM to 4 AM.",
        date: "2025-10-15",
      },
      {
        id: 3,
        title: "Holiday Bonus",
        description: "Special bonus for deposits during the holiday season.",
        date: "2025-10-10",
      },
    ];
    setNews(mockNews);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-[#006bff] mb-6">Latest News</h1>
      <div className="grid gap-6">
        {news.map((item) => (
          <Card
            key={item.id}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <p className="text-gray-500 text-sm">{item.date}</p>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
