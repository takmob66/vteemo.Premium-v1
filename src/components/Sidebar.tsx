import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, TrendingUp, Music, Gamepad2, Film, Trophy, 
  Lightbulb, Shirt, GraduationCap, Smile, Crown, Gift 
} from 'lucide-react';
import { useVideo } from '../contexts/VideoContext';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useVideo();
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  const categories = [
    { name: 'All', key: 'sidebar.home', icon: Home },
    { name: 'Trending', key: 'sidebar.trending', icon: TrendingUp },
    { name: 'Music', key: 'sidebar.music', icon: Music },
    { name: 'Gaming', key: 'sidebar.gaming', icon: Gamepad2 },
    { name: 'Movies', key: 'sidebar.movies', icon: Film },
    { name: 'Sports', key: 'sidebar.sports', icon: Trophy },
    { name: 'Technology', key: 'sidebar.technology', icon: Lightbulb },
    { name: 'Fashion', key: 'sidebar.fashion', icon: Shirt },
    { name: 'Education', key: 'sidebar.education', icon: GraduationCap },
    { name: 'Entertainment', key: 'sidebar.entertainment', icon: Smile },
  ];

  const premiumItems = [
    { name: 'Premium', key: 'sidebar.premium', icon: Crown, to: '/premium', gradient: true },
    { name: 'Rewards', key: 'sidebar.rewards', icon: Gift, to: '/rewards', gold: true },
  ];

  // Debug function for navigation
  const debugNavigation = (path: string) => {
    console.log(`🔗 Sidebar navigating to: ${path} from ${location.pathname}`);
  };

  // Custom Link component with debug
  const NavigationLink = ({ 
    to, 
    children, 
    className, 
    onClick 
  }: { 
    to: string; 
    children: React.ReactNode; 
    className?: string; 
    onClick?: () => void;
  }) => (
    <Link
      to={to}
      className={className}
      onClick={(e) => {
        debugNavigation(to);
        if (onClick) onClick();
      }}
    >
      {children}
    </Link>
  );

  return (
    <aside className={`w-64 bg-gray-900 border-r border-gray-800 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto ${
      isRTL ? 'border-l border-r-0' : ''
    }`}>
      <nav className="p-4">
        {/* Main Categories */}
        <div className="space-y-2 mb-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => {
                  console.log(`📂 Category selected: ${category.name}`);
                  setSelectedCategory(category.name);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isRTL ? 'space-x-reverse' : ''
                } ${
                  isActive
                    ? 'bg-gradient-purple text-white shadow-purple'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{t(category.key) || category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Premium Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Premium Features
          </h3>
          {premiumItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.to;
            
            return (
              <NavigationLink
                key={item.name}
                to={item.to}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  isRTL ? 'space-x-reverse' : ''
                } ${
                  item.gradient
                    ? `bg-gradient-purple text-white shadow-purple hover:shadow-lg ${isActive ? 'ring-2 ring-gold-400' : ''}`
                    : item.gold
                    ? `bg-gradient-gold text-gray-900 shadow-gold hover:shadow-lg font-bold ${isActive ? 'ring-2 ring-purple-400' : ''}`
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{t(item.key) || item.name}</span>
                {item.gold && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </NavigationLink>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-6 space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Links
          </h3>
          
          <NavigationLink
            to="/upload"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Upload Video</span>
          </NavigationLink>

          <NavigationLink
            to="/test"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-blue-400 hover:bg-blue-900/20 hover:text-blue-300 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-xs">API Test</span>
          </NavigationLink>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="text-xs text-gray-500 space-y-1">
            <p>© 2024 VTEEMO</p>
            <p>Premium Video Platform</p>
            <p className="text-blue-400">Current: {location.pathname}</p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;