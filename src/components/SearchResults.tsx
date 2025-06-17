
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export interface SearchResult {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading }) => {
  const { t, direction } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">{t('noResults')}</div>
        <p className="text-gray-500">{t('searchFirst')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('results')}</h2>
      <div className="space-y-4">
        {results.map((result) => (
          <Card key={result.id} className="hover:shadow-lg transition-shadow duration-200 bg-white/80 backdrop-blur-sm border-gray-200">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-xl text-gray-800 leading-tight flex-1">
                  {result.title}
                </CardTitle>
                <Badge variant="secondary" className="shrink-0 bg-blue-100 text-blue-700">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {t('source')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-gray-600 leading-relaxed mb-4 ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                {result.summary}
              </p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors duration-200"
              >
                {result.source}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
