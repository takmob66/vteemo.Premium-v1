import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Upload, Bell, User, Menu, Play, Crown, Gift } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useVideo } from '../contexts/VideoContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { searchQuery, setSearchQuery } = useVideo();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Debug function for navigation
  const debugNavigation = (path: string) => {
    console.log(`🔗 Navigating to: ${path} from ${location.pathname}`);
  };

  // Custom Link handler with debug
  const NavigationLink = ({ 
    to, 
    children, 
    className, 
    title, 
    onClick 
  }: { 
    to: string; 
    children: React.ReactNode; 
    className?: string; 
    title?: string;
    onClick?: () => void;
  }) => (
    <Link
      to={to}
      className={className}
      title={title}
      onClick={(e) => {
        debugNavigation(to);
        if (onClick) onClick();
      }}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-gradient-purple border-b border-purple-700/30 px-6 py-3 shadow-lg">
      <div className="flex items-center justify-between">
        <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
          <button className="p-2 hover:bg-purple-700/50 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </button>
          
          <NavigationLink 
            to="/" 
            className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}
          >
            <div className="relative">
              <Play className="w-8 h-8 text-gold-500 fill-current" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-bold text-white">VTEEMO</span>
              <div className="text-xs text-gold-300 font-medium">Premium</div>
            </div>
          </NavigationLink>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('header.search') || 'Search...'}
              className={`flex-1 px-4 py-2 bg-gray-800/80 border border-purple-600/50 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all ${
                isRTL ? 'rounded-r-full' : 'rounded-l-full'
              }`}
            />
            <button
              type="submit"
              className={`px-6 py-2 bg-purple-700 border border-purple-600 hover:bg-purple-600 transition-colors ${
                isRTL ? 'rounded-l-full' : 'rounded-r-full'
              }`}
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>

        <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
          <LanguageSelector />
          
          {/* Test Link - Always visible */}
          <NavigationLink
            to="/test"
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-xs"
            title="API Test"
          >
            Test
          </NavigationLink>
          
          {isAuthenticated ? (
            <>
              <NavigationLink
                to="/premium"
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-gold text-gray-900 rounded-lg hover:shadow-gold transition-all transform hover:scale-105"
                title={t('sidebar.premium') || 'Premium'}
              >
                <Crown className="w-4 h-4" />
                <span className="font-bold text-sm">{t('sidebar.premium') || 'Premium'}</span>
              </NavigationLink>
              
              <NavigationLink
                to="/rewards"
                className="p-2 hover:bg-purple-700/50 rounded-lg transition-colors relative"
                title={t('sidebar.rewards') || 'Rewards'}
              >
                <Gift className="w-5 h-5 text-gold-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold-500 rounded-full animate-pulse"></div>
              </NavigationLink>
              
              <NavigationLink
                to="/upload"
                className="p-2 hover:bg-purple-700/50 rounded-lg transition-colors"
                title={t('header.upload') || 'Upload'}
              >
                <Upload className="w-5 h-5 text-white" />
              </NavigationLink>
              
              <button className="p-2 hover:bg-purple-700/50 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-1 hover:bg-purple-700/50 rounded-lg transition-colors"
                >
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={user?.username || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-gold-400"
                  />
                </button>
                
                {showUserMenu && (
                  <div className={`absolute top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}>
                    <div className="p-3 border-b border-gray-700 bg-gradient-purple-light text-gray-900 rounded-t-lg">
                      <p className="font-medium">{user?.username || 'Guest'}</p>
                      <p className="text-sm opacity-80">{user?.email || 'guest@vteemo.com'}</p>
                    </div>
                    <div className="py-2">
                      <NavigationLink
                        to={`/profile/${user?.id || '1'}`}
                        className="block px-4 py-2 text-white hover:bg-purple-700/50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        {t('header.profile') || 'Profile'}
                      </NavigationLink>
                      {isAdmin && (
                        <NavigationLink
                          to="/admin"
                          className="block px-4 py-2 text-white hover:bg-purple-700/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          {t('header.admin') || 'Admin'}
                        </NavigationLink>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-purple-700/50 transition-colors"
                      >
                        {t('header.signout') || 'Sign Out'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <NavigationLink
              to="/login"
              className={`flex items-center space-x-2 px-4 py-2 bg-gradient-gold text-gray-900 rounded-lg hover:shadow-gold transition-all transform hover:scale-105 font-bold ${
                isRTL ? 'space-x-reverse' : ''
              }`}
            >
              <User className="w-4 h-4" />
              <span>{t('header.signin') || 'Sign In'}</span>
            </NavigationLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;