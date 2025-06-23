
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, TrendingUp } from 'lucide-react';

interface FeaturedArticleProps {
  title: string;
  url: string;
  summary: string;
  publishedAt: string;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ 
  title, 
  url, 
  summary, 
  publishedAt 
}) => {
  const { direction } = useLanguage();

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                Featured
              </span>
              <span className="text-xs text-gray-500">{publishedAt}</span>
            </div>
            <h3 className={`font-semibold text-gray-900 mb-2 leading-tight ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {title}
            </h3>
            <p className={`text-sm text-gray-600 mb-3 leading-relaxed ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
              {summary}
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Read full article
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedArticle;
