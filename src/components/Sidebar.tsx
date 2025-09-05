import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, TrendingUp, Music, Gamepad2, Film, Trophy, 
  Lightbulb, Shirt, GraduationCap, Smile, Crown, Gift 
} from 'lucide-react';
import { useVideo } from '../contexts/VideoContext';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useVideo();
  const { t, isRTL } = useLanguage();

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

  return (
    <aside className={`w-64 bg-gray-900 border-r border-gray-800 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto ${
      isRTL ? 'border-l border-r-0' : ''
    }`}>
      <nav className="p-4">
        {/* Main Categories */}
        <div className="space-y-2 mb-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isRTL ? 'space-x-reverse' : ''
                } ${
                  selectedCategory === category.name
                    ? 'bg-gradient-purple text-white shadow-purple'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{t(category.key)}</span>
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
            return (
              <Link
                key={item.name}
                to={item.to}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  isRTL ? 'space-x-reverse' : ''
                } ${
                  item.gradient
                    ? 'bg-gradient-purple text-white shadow-purple hover:shadow-lg'
                    : item.gold
                    ? 'bg-gradient-gold text-gray-900 shadow-gold hover:shadow-lg font-bold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{t(item.key)}</span>
                {item.gold && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="text-xs text-gray-500 space-y-1">
            <p>© 2024 VideoTube</p>
            <p>Premium Video Platform</p>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;