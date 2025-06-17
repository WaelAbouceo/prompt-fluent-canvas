
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
    <div className={`w-64 bg-white border-${direction === 'rtl' ? 'r' : 'l'} border-gray-200 flex flex-col`}>
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavigationSidebar;
