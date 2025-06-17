
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import SearchBar from '@/components/SearchBar';
import SearchResults, { SearchResult } from '@/components/SearchResults';
import ChatInterface, { ChatMessage } from '@/components/ChatInterface';

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { direction } = useLanguage();

  // Mock search function - replace with actual API call
  const handleSearch = async (query: string) => {
    setIsSearchLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock results
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: direction === 'rtl' 
          ? 'مقدمة شاملة حول الذكاء الاصطناعي وتطبيقاته' 
          : 'Comprehensive Introduction to Artificial Intelligence and Its Applications',
        summary: direction === 'rtl'
          ? 'الذكاء الاصطناعي هو مجال متطور يهدف إلى إنشاء أنظمة قادرة على محاكاة الذكاء البشري. يشمل هذا المجال تطبيقات متنوعة مثل التعلم الآلي، معالجة اللغات الطبيعية، والرؤية الحاسوبية.'
          : 'Artificial Intelligence is a rapidly evolving field that aims to create systems capable of mimicking human intelligence. This field encompasses diverse applications including machine learning, natural language processing, and computer vision.',
        source: 'AI Research Institute',
        url: 'https://example.com/ai-intro'
      },
      {
        id: '2',
        title: direction === 'rtl'
          ? 'أحدث التطورات في تقنيات التعلم العميق'
          : 'Latest Developments in Deep Learning Technologies',
        summary: direction === 'rtl'
          ? 'التعلم العميق يشهد تطورات مستمرة مع ظهور نماذج جديدة وتحسينات في الأداء. هذه التقنيات تحدث ثورة في مجالات مختلفة من الطب إلى النقل الذاتي.'
          : 'Deep learning continues to evolve with new models and performance improvements. These technologies are revolutionizing various fields from medicine to autonomous transportation.',
        source: 'Tech Innovation Journal',
        url: 'https://example.com/deep-learning'
      },
      {
        id: '3',
        title: direction === 'rtl'
          ? 'مستقبل الذكاء الاصطناعي في الصناعات المختلفة'
          : 'The Future of AI in Various Industries',
        summary: direction === 'rtl'
          ? 'يتوقع الخبراء أن يحدث الذكاء الاصطناعي تغييرات جذرية في الصناعات المختلفة، من الرعاية الصحية إلى التمويل والتعليم، مما يفتح آفاقاً جديدة للنمو والابتكار.'
          : 'Experts predict that AI will bring fundamental changes to various industries, from healthcare to finance and education, opening new horizons for growth and innovation.',
        source: 'Future Tech Magazine',
        url: 'https://example.com/ai-future'
      }
    ];
    
    setSearchResults(mockResults);
    setIsSearchLoading(false);
    setHasSearched(true);
  };

  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsChatLoading(true);
    
    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: direction === 'rtl'
        ? 'شكراً لسؤالك! هذا مثال على رد الذكاء الاصطناعي. في التطبيق الحقيقي، ستتم معالجة استفسارك وتقديم إجابة مفصلة ومفيدة بناءً على المعلومات المتاحة.'
        : 'Thank you for your question! This is an example AI response. In a real application, your query would be processed and a detailed, helpful answer would be provided based on available information.',
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, aiResponse]);
    setIsChatLoading(false);
  };

  const handleClearChat = () => {
    setChatMessages([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {direction === 'rtl' ? 'محرك البحث الذكي' : 'Smart Search Engine'}
            </h1>
          </div>
          <LanguageToggle />
        </div>

        {/* Hero Search */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} isLoading={isSearchLoading} />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Search Results */}
          <div className="space-y-6">
            <SearchResults results={searchResults} isLoading={isSearchLoading} />
          </div>

          {/* Chat Interface */}
          <div className="lg:sticky lg:top-6 h-[600px]">
            <ChatInterface
              messages={chatMessages}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              isLoading={isChatLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
