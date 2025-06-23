
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bot } from 'lucide-react';
import Citation, { CitationData } from './Citation';

interface StreamingMessageProps {
  content: string;
  citations: CitationData[];
  isStreaming: boolean;
  onStreamComplete?: () => void;
}

const StreamingMessage: React.FC<StreamingMessageProps> = ({ 
  content, 
  citations, 
  isStreaming,
  onStreamComplete 
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { direction } = useLanguage();

  useEffect(() => {
    if (isStreaming && currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Adjust speed as needed

      return () => clearTimeout(timer);
    } else if (currentIndex >= content.length && isStreaming) {
      onStreamComplete?.();
    }
  }, [currentIndex, content, isStreaming, onStreamComplete]);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedContent(content);
      setCurrentIndex(content.length);
    }
  }, [content, isStreaming]);

  const renderContentWithCitations = (text: string) => {
    if (citations.length === 0) return text;

    let result = text;
    citations.forEach((citation, index) => {
      // Replace citation markers like [1], [2], etc. with Citation components
      const citationMarker = `[${index + 1}]`;
      const citationRegex = new RegExp(`\\[${index + 1}\\]`, 'g');
      
      if (result.includes(citationMarker)) {
        const parts = result.split(citationRegex);
        result = parts.join(`__CITATION_${index}__`);
      }
    });

    // Convert back to JSX
    const parts = result.split(/(__CITATION_\d+__)/);
    return parts.map((part, index) => {
      const citationMatch = part.match(/^__CITATION_(\d+)__$/);
      if (citationMatch) {
        const citationIndex = parseInt(citationMatch[1]);
        return (
          <Citation 
            key={`citation-${citationIndex}`} 
            citation={citations[citationIndex]} 
            index={citationIndex} 
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`flex gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
        <Bot className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="bg-gray-100 p-4 rounded-2xl">
          <div className={`text-sm leading-relaxed ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
            {renderContentWithCitations(displayedContent)}
            {isStreaming && currentIndex < content.length && (
              <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1"></span>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1 px-3">
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default StreamingMessage;
