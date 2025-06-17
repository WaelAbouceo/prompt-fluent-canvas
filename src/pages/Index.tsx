import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import SearchBar from '@/components/SearchBar';
import SearchResults, { SearchResult } from '@/components/SearchResults';
import ChatInterface, { ChatMessage } from '@/components/ChatInterface';
import NavigationSidebar from '@/components/NavigationSidebar';

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'chat' | 'explore'>('search');
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

  if (!hasSearched) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Navigation Sidebar */}
        <NavigationSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`flex ${direction === 'rtl' ? 'justify-start' : 'justify-end'} p-4`}>
            <LanguageToggle />
          </div>

          {/* Centered Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
            <div className="w-full max-w-2xl text-center">
              {/* Logo/Title */}
              <h1 className="forbes-heading text-5xl font-bold text-gray-900 mb-3 tracking-tight">
                {direction === 'rtl' ? 'فوربس الشرق الأوسط' : 'Forbes Middle East'}
              </h1>
              <p className="forbes-text text-lg text-gray-600 mb-12 font-light">
                {direction === 'rtl' ? 'محرك البحث الذكي' : 'Intelligent Search Engine'}
              </p>

              {/* Search Bar */}
              <div className="w-full">
                <SearchBar onSearch={handleSearch} isLoading={isSearchLoading} />
              </div>

              {/* Suggested Actions */}
              <div className="mt-8 text-sm text-gray-500 forbes-text">
                {direction === 'rtl' ? 'اسأل أي شيء...' : 'Ask anything...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Navigation Sidebar */}
      <NavigationSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className={`flex ${direction === 'rtl' ? 'flex-row-reverse' : ''} justify-between items-center mb-8`}>
            <div className="flex items-center gap-4">
              <h1 className="forbes-heading text-2xl font-semibold text-gray-900 tracking-tight">
                {direction === 'rtl' ? 'فوربس الشرق الأوسط' : 'Forbes Middle East'}
              </h1>
            </div>
            <LanguageToggle />
          </div>

          {/* Compact Search Bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} isLoading={isSearchLoading} />
          </div>

          {/* Content based on active tab */}
          {activeTab === 'search' && (
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
          )}

          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto">
              <ChatInterface
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                onClearChat={handleClearChat}
                isLoading={isChatLoading}
              />
            </div>
          )}

          {activeTab === 'explore' && (
            <div className="text-center py-12">
              <h2 className="forbes-heading text-3xl font-semibold text-gray-800 mb-4">
                {direction === 'rtl' ? 'استكشف' : 'Explore'}
              </h2>
              <p className="forbes-text text-gray-600 text-lg">
                {direction === 'rtl' 
                  ? 'اكتشف مواضيع جديدة ومثيرة للاهتمام'
                  : 'Discover new and interesting topics'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
