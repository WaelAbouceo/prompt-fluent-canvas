
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import SearchBar from '@/components/SearchBar';
import SearchResults, { SearchResult } from '@/components/SearchResults';
import NavigationSidebar from '@/components/NavigationSidebar';
import EnhancedChatInterface, { EnhancedChatMessage } from '@/components/EnhancedChatInterface';
import { CitationData } from '@/components/Citation';
import ExploreSection from '@/components/ExploreSection';

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [chatMessages, setChatMessages] = useState<EnhancedChatMessage[]>([]);
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
    const userMessage: EnhancedChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsChatLoading(true);
    
    // Simulate API call to Forbes data endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock streaming response with citations
    const mockCitations: CitationData[] = [
      {
        id: '1',
        title: direction === 'rtl' 
          ? 'الإمارات تقود الاستثمار في الذكاء الاصطناعي بالمنطقة'
          : 'UAE Leads AI Investment in the Region',
        url: 'https://example.com/uae-ai-leadership',
        summary: direction === 'rtl'
          ? 'تقرير شامل حول استراتيجية الإمارات في الذكاء الاصطناعي وخططها المستقبلية للاستثمار في هذا المجال'
          : 'Comprehensive report on UAE\'s AI strategy and future investment plans in the field',
        source: 'Forbes Middle East'
      },
      {
        id: '2',
        title: direction === 'rtl'
          ? 'صندوق محمد بن راشد للابتكار يخصص مليار درهم للذكاء الاصطناعي'
          : 'Mohammed bin Rashid Innovation Fund Allocates AED 1 Billion for AI',
        url: 'https://example.com/innovation-fund-ai',
        summary: direction === 'rtl'
          ? 'إعلان صندوق محمد بن راشد للابتكار عن تخصيص استثمارات ضخمة لدعم الشركات الناشئة في مجال الذكاء الاصطناعي'
          : 'Announcement of massive investments by the Mohammed bin Rashid Innovation Fund to support AI startups',
        source: 'Forbes Middle East'
      }
    ];
    
    const aiResponse: EnhancedChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: direction === 'rtl'
        ? 'وفقاً لتقارير فوربس الشرق الأوسط الحديثة، تشهد دولة الإمارات العربية المتحدة نمواً متسارعاً في استثمارات الذكاء الاصطناعي [1]. تهدف الحكومة الإماراتية إلى استثمار مبلغ 100 مليار درهم في قطاع الذكاء الاصطناعي بحلول عام 2031، مما يجعلها رائدة في هذا المجال على مستوى المنطقة [2]. هذه الاستثمارات تشمل تطوير البنية التحتية، دعم الشركات الناشئة، والبحث والتطوير.'
        : 'According to recent Forbes Middle East reports, the UAE is experiencing rapid growth in AI investments [1]. The UAE government aims to invest AED 100 billion in the AI sector by 2031, making it a regional leader in this field [2]. These investments include infrastructure development, startup support, and research & development.',
      citations: mockCitations,
      timestamp: new Date(),
      isStreaming: true
    };
    
    setChatMessages(prev => [...prev, aiResponse]);
    setIsChatLoading(false);
    
    // Simulate streaming completion
    setTimeout(() => {
      setChatMessages(prev => prev.map(msg => 
        msg.id === aiResponse.id ? { ...msg, isStreaming: false } : msg
      ));
    }, 2000);
  };

  const handleClearChat = () => {
    setChatMessages([]);
  };

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
        <div className={`flex ${direction === 'rtl' ? 'justify-start' : 'justify-end'} p-6`}>
          <LanguageToggle />
        </div>

        {/* Content based on active tab */}
        {activeTab === 'search' && !hasSearched && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            <div className="w-full max-w-2xl text-center">
              {/* Logo/Title */}
              <h1 className="forbes-heading text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                {direction === 'rtl' ? 'فوربس الشرق الأوسط' : 'Forbes Middle East'}
              </h1>
              <p className="forbes-text text-xl text-gray-600 mb-16 font-light">
                {direction === 'rtl' ? 'محرك البحث الذكي' : 'Intelligent Search Engine'}
              </p>

              {/* Search Bar */}
              <div className="w-full mb-8">
                <SearchBar onSearch={handleSearch} isLoading={isSearchLoading} />
              </div>

              {/* Suggested Actions */}
              <div className="text-base text-gray-500 forbes-text">
                {direction === 'rtl' ? 'اسأل أي شيء...' : 'Ask anything...'}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && hasSearched && (
          <div className="flex-1 px-6">
            {/* Compact Search Bar */}
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} isLoading={isSearchLoading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Search Results */}
              <div className="space-y-6">
                <SearchResults results={searchResults} isLoading={isSearchLoading} />
              </div>

              {/* Enhanced Chat Interface */}
              <div className="lg:sticky lg:top-6 h-[700px]">
                <EnhancedChatInterface
                  messages={chatMessages}
                  onSendMessage={handleSendMessage}
                  onClearChat={handleClearChat}
                  isLoading={isChatLoading}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex-1 px-6">
            <div className="max-w-5xl mx-auto">
              <EnhancedChatInterface
                messages={chatMessages}
                onSendMessage={handleSendMessage}
                onClearChat={handleClearChat}
                isLoading={isChatLoading}
              />
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
          <div className="flex-1 px-6">
            <ExploreSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
