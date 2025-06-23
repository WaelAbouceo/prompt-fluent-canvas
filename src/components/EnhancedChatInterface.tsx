
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Trash2, User } from 'lucide-react';
import StreamingMessage from './StreamingMessage';
import FeaturedArticle from './FeaturedArticle';
import { CitationData } from './Citation';

export interface EnhancedChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: CitationData[];
  timestamp: Date;
  isStreaming?: boolean;
}

interface EnhancedChatInterfaceProps {
  messages: EnhancedChatMessage[];
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  isLoading: boolean;
}

const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  isLoading
}) => {
  const [input, setInput] = useState('');
  const { t, direction } = useLanguage();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  // Mock featured article data
  const featuredArticle = {
    title: direction === 'rtl' 
      ? 'الإمارات تستثمر 100 مليار درهم في الذكاء الاصطناعي بحلول 2031'
      : 'UAE to Invest AED 100 Billion in AI by 2031, Forbes Reports',
    url: 'https://example.com/uae-ai-investment',
    summary: direction === 'rtl'
      ? 'تخطط دولة الإمارات العربية المتحدة لاستثمار مبلغ ضخم في تقنيات الذكاء الاصطناعي كجزء من رؤية الإمارات 2071 لتصبح أفضل دولة في العالم.'
      : 'The UAE plans to make massive investments in AI technologies as part of the UAE Vision 2071 to become the world\'s best country.',
    publishedAt: '2 hours ago'
  };

  return (
    <div className="flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 forbes-heading">
          {direction === 'rtl' ? 'محادثة ذكية' : 'AI Chat'}
        </h2>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearChat}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {t('clear')}
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {/* Featured Article */}
        <FeaturedArticle {...featuredArticle} />

        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
              <Send className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-lg font-medium mb-2">
              {direction === 'rtl' ? 'اسأل عن فوربس الشرق الأوسط' : 'Ask about Forbes Middle East'}
            </p>
            <p className="text-sm text-gray-400">
              {direction === 'rtl' 
                ? 'احصل على آخر الأخبار والتحليلات المالية'
                : 'Get the latest news and financial insights'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'user' ? (
                  <div className={`flex gap-3 ${
                    direction === 'rtl' ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className={`flex-1 max-w-[80%] ${
                      direction === 'rtl' ? 'text-right' : 'text-left'
                    }`}>
                      <div className="bg-blue-600 text-white p-3 rounded-2xl">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-3">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <StreamingMessage
                    content={message.content}
                    citations={message.citations || []}
                    isStreaming={message.isStreaming || false}
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`flex gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={direction === 'rtl' 
              ? 'اسأل عن آخر أخبار فوربس الشرق الأوسط...'
              : 'Ask about Forbes Middle East news...'
            }
            className={`flex-1 bg-gray-50 border-gray-300 rounded-xl ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedChatInterface;
