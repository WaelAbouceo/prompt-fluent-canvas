
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Globe, DollarSign, Building, Zap, Users } from 'lucide-react';

const ExploreSection = () => {
  const { direction } = useLanguage();

  const trendingTopics = [
    {
      id: '1',
      icon: TrendingUp,
      title: direction === 'rtl' ? 'الاستثمار في التكنولوجيا' : 'Technology Investment',
      description: direction === 'rtl' 
        ? 'آخر الأخبار حول الاستثمارات التقنية في المنطقة'
        : 'Latest news on tech investments in the region',
      tag: direction === 'rtl' ? 'الأكثر تداولاً' : 'Trending',
      color: 'bg-blue-50 text-blue-700'
    },
    {
      id: '2',
      icon: Globe,
      title: direction === 'rtl' ? 'الأسواق العالمية' : 'Global Markets',
      description: direction === 'rtl'
        ? 'تحليل الأسواق المالية العالمية وتأثيرها على المنطقة'
        : 'Global financial markets analysis and regional impact',
      tag: direction === 'rtl' ? 'عاجل' : 'Breaking',
      color: 'bg-red-50 text-red-700'
    },
    {
      id: '3',
      icon: DollarSign,
      title: direction === 'rtl' ? 'ريادة الأعمال' : 'Entrepreneurship',
      description: direction === 'rtl'
        ? 'قصص نجاح رواد الأعمال والشركات الناشئة'
        : 'Success stories of entrepreneurs and startups',
      tag: direction === 'rtl' ? 'ملهم' : 'Inspiring',
      color: 'bg-green-50 text-green-700'
    },
    {
      id: '4',
      icon: Building,
      title: direction === 'rtl' ? 'القطاع العقاري' : 'Real Estate',
      description: direction === 'rtl'
        ? 'تطورات السوق العقاري والمشاريع الضخمة'
        : 'Real estate market developments and mega projects',
      tag: direction === 'rtl' ? 'نمو' : 'Growth',
      color: 'bg-purple-50 text-purple-700'
    },
    {
      id: '5',
      icon: Zap,
      title: direction === 'rtl' ? 'الطاقة المتجددة' : 'Renewable Energy',
      description: direction === 'rtl'
        ? 'مستقبل الطاقة النظيفة في الشرق الأوسط'
        : 'The future of clean energy in the Middle East',
      tag: direction === 'rtl' ? 'مستقبلي' : 'Future',
      color: 'bg-yellow-50 text-yellow-700'
    },
    {
      id: '6',
      icon: Users,
      title: direction === 'rtl' ? 'القيادة والإدارة' : 'Leadership & Management',
      description: direction === 'rtl'
        ? 'أساليب القيادة الحديثة وإدارة الفرق'
        : 'Modern leadership styles and team management',
      tag: direction === 'rtl' ? 'تطوير' : 'Development',
      color: 'bg-indigo-50 text-indigo-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="forbes-heading text-4xl font-bold text-gray-900 mb-4">
          {direction === 'rtl' ? 'استكشف' : 'Explore'}
        </h1>
        <p className="forbes-text text-lg text-gray-600 max-w-2xl mx-auto">
          {direction === 'rtl' 
            ? 'اكتشف أحدث المواضيع والاتجاهات في عالم الأعمال والاقتصاد'
            : 'Discover the latest topics and trends in business and economics'
          }
        </p>
      </div>

      {/* Trending Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card 
              key={topic.id} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105 bg-white/80 backdrop-blur-sm border-gray-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                  <Badge className={`${topic.color} border-0 font-medium`}>
                    {topic.tag}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gray-800 leading-tight">
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-gray-600 leading-relaxed ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {topic.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Categories */}
      <div className="mt-16">
        <h2 className="forbes-heading text-2xl font-semibold text-gray-800 mb-8 text-center">
          {direction === 'rtl' ? 'الفئات الرئيسية' : 'Featured Categories'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            direction === 'rtl' ? 'أخبار الأعمال' : 'Business News',
            direction === 'rtl' ? 'التكنولوجيا' : 'Technology',
            direction === 'rtl' ? 'الاستثمار' : 'Investment',
            direction === 'rtl' ? 'ريادة الأعمال' : 'Entrepreneurship',
            direction === 'rtl' ? 'الأسواق المالية' : 'Financial Markets',
            direction === 'rtl' ? 'العقارات' : 'Real Estate',
            direction === 'rtl' ? 'الطاقة' : 'Energy',
            direction === 'rtl' ? 'الابتكار' : 'Innovation'
          ].map((category, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="px-6 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer transition-colors border-gray-300 text-gray-700"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
