
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
            placeholder={direction === 'rtl' ? 'ابحث عن أي شيء...' : 'Search anything...'}
            className={`
              h-16 bg-white border-2 border-gray-200 rounded-2xl shadow-lg
              focus:border-amber-400 focus:ring-4 focus:ring-amber-100 focus:shadow-xl
              transition-all duration-300 text-lg font-light
              ${direction === 'rtl' ? 'pr-16 pl-24 text-right' : 'pl-16 pr-24'}
              hover:shadow-xl hover:border-gray-300
            `}
            disabled={isLoading}
          />
          
          {/* Search Icon */}
          <Search 
            className={`
              absolute top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400
              ${direction === 'rtl' ? 'right-5' : 'left-5'}
            `} 
          />
          
          {/* Action Buttons */}
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 flex items-center gap-3
            ${direction === 'rtl' ? 'left-4' : 'right-4'}
          `}>
            {/* Microphone Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleMic}
              className="h-10 w-10 p-0 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              {isListening ? (
                <MicOff className="w-5 h-5 text-red-500" />
              ) : (
                <Mic className="w-5 h-5 text-gray-500 hover:text-amber-600" />
              )}
            </Button>
            
            {/* Search Button - only show when there's text */}
            {query.trim() && (
              <Button
                type="submit"
                disabled={isLoading}
                className="h-10 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  direction === 'rtl' ? 'بحث' : 'Search'
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
