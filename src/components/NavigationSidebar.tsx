
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
    <div className={`w-64 bg-white border-${direction === 'rtl' ? 'r' : 'l'} border-gray-200 flex flex-col shadow-sm`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className="forbes-heading text-xl font-semibold text-gray-900">
          {direction === 'rtl' ? 'فوربس الشرق الأوسط' : 'Forbes Middle East'}
        </h2>
      </div>
      
      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200
                  forbes-nav-item
                  ${isActive 
                    ? 'forbes-nav-item active bg-amber-50 text-amber-700 border-l-3 border-amber-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-3 border-transparent hover:border-amber-400'
                  }
                  ${direction === 'rtl' ? 'flex-row-reverse border-r-3 border-l-0' : ''}
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-amber-600' : 'text-gray-500'}`} />
                <span className="forbes-text">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavigationSidebar;
