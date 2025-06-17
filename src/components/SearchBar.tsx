
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Mic, MicOff } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { t, direction } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    // Add voice recognition logic here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="relative">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search')}
            className={`
              h-14 bg-white border border-gray-200 rounded-xl shadow-sm
              focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:shadow-md
              transition-all duration-200 text-base
              ${direction === 'rtl' ? 'pr-14 pl-20 text-right' : 'pl-14 pr-20'}
            `}
            disabled={isLoading}
          />
          
          {/* Search Icon */}
          <Search 
            className={`
              absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400
              ${direction === 'rtl' ? 'right-4' : 'left-4'}
            `} 
          />
          
          {/* Action Buttons */}
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 flex items-center gap-2
            ${direction === 'rtl' ? 'left-3' : 'right-3'}
          `}>
            {/* Microphone Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleMic}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg"
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-red-500" />
              ) : (
                <Mic className="w-4 h-4 text-gray-500" />
              )}
            </Button>
            
            {/* Search Button - only show when there's text */}
            {query.trim() && (
              <Button
                type="submit"
                disabled={isLoading}
                size="sm"
                className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
              >
                {isLoading ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t('searchButton')
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
