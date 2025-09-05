import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Eye, EyeOff, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t, isRTL } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.email, formData.password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-600/30 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className={`flex items-center justify-center space-x-2 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="relative">
                <Play className="w-12 h-12 text-gold-500 fill-current" />
                <Crown className="w-6 h-6 text-purple-400 absolute -top-2 -right-2" />
              </div>
              <div>
                <span className="text-3xl font-bold text-white">VideoTube</span>
                <div className="text-xs text-gold-300 font-medium">Premium</div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">{t('login.title')}</h2>
            <p className="text-gray-400 mt-2">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('login.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700/50 border border-purple-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-purple-600/30 rounded-lg text-white focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 transition-all backdrop-blur-sm pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-gold text-gray-900 font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-gold hover:shadow-xl"
            >
              {t('login.signin')}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-700/50 pt-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">{t('login.demo')}</h3>
            <div className="space-y-3">
              <div className="bg-gradient-purple/20 border border-purple-600/30 p-3 rounded-lg backdrop-blur-sm">
                <p className="text-gray-300 text-sm">
                  <strong className="text-gold-400">{t('login.admin')}:</strong> admin@example.com / admin
                </p>
              </div>
              <div className="bg-gray-700/30 border border-gray-600/30 p-3 rounded-lg backdrop-blur-sm">
                <p className="text-gray-300 text-sm">
                  <strong className="text-purple-400">{t('login.user')}:</strong> user@example.com / user
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;