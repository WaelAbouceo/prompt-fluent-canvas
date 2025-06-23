
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, MessageSquare, Compass } from 'lucide-react';

interface NavigationSidebarProps {
  activeTab: 'search' | 'chat' | 'explore';
  onTabChange: (tab: 'search' | 'chat' | 'explore') => void;
}

const NavigationSidebar: React.FC<NavigationSidebarProps> = ({ activeTab, onTabChange }) => {
  const { direction } = useLanguage();

  const navItems = [
    {
      id: 'search' as const,
      icon: Search,
      label: direction === 'rtl' ? 'البحث' : 'Search'
    },
    {
      id: 'chat' as const,
      icon: MessageSquare,
      label: direction === 'rtl' ? 'المحادثة' : 'Chat'
    },
    {
      id: 'explore' as const,
      icon: Compass,
      label: direction === 'rtl' ? 'استكشف' : 'Explore'
    }
  ];

  return (
    <div className={`w-72 bg-white border-${direction === 'rtl' ? 'r' : 'l'} border-gray-200 flex flex-col shadow-sm`}>
      {/* Header */}
      <div className="p-8 border-b border-gray-100">
        <h2 className="forbes-heading text-2xl font-bold text-gray-900 mb-1">
          {direction === 'rtl' ? 'فوربس' : 'Forbes'}
        </h2>
        <p className="forbes-text text-sm text-gray-600 font-light">
          {direction === 'rtl' ? 'الشرق الأوسط' : 'Middle East'}
        </p>
      </div>
      
      {/* Navigation */}
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 text-base font-medium transition-all duration-300 rounded-xl
                  ${direction === 'rtl' ? 'flex-row-reverse text-right' : ''}
                  ${isActive 
                    ? 'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 shadow-sm border-l-4 border-amber-500' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }
                  ${direction === 'rtl' ? 'border-r-4 border-l-0' : ''}
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-amber-600' : 'text-gray-500'} transition-colors`} />
                <span className="forbes-text font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavigationSidebar;
