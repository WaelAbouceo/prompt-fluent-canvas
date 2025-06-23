
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ExternalLink } from 'lucide-react';

export interface CitationData {
  id: string;
  title: string;
  url: string;
  summary: string;
  source: string;
}

interface CitationProps {
  citation: CitationData;
  index: number;
}

const Citation: React.FC<CitationProps> = ({ citation, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <button
          className="inline-flex items-center px-1.5 py-0.5 mx-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          [{index + 1}]
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4 bg-white shadow-lg border border-gray-200 rounded-lg">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm leading-tight">
              {citation.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{citation.source}</p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {citation.summary}
          </p>
          <a
            href={citation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Read full article
          </a>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Citation;
