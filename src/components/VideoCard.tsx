import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Crown } from 'lucide-react';
import { Video } from '../contexts/VideoContext';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { t, language } = useLanguage();

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M ${t('video.views')}`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K ${t('video.views')}`;
    }
    return `${views} ${t('video.views')}`;
  };

  const formatDate = (date: string) => {
    const now = new Date();
    const videoDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - videoDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (language === 'fa') {
      if (diffDays === 1) return '۱ روز پیش';
      if (diffDays < 7) return `${diffDays} روز پیش`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`;
      return `${Math.floor(diffDays / 365)} سال پیش`;
    } else if (language === 'ar') {
      if (diffDays === 1) return 'منذ يوم واحد';
      if (diffDays < 7) return `منذ ${diffDays} أيام`;
      if (diffDays < 30) return `منذ ${Math.floor(diffDays / 7)} أسابيع`;
      if (diffDays < 365) return `منذ ${Math.floor(diffDays / 30)} شهور`;
      return `منذ ${Math.floor(diffDays / 365)} سنوات`;
    } else {
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    }
  };

  return (
    <div className="video-card bg-gray-800/50 backdrop-blur-sm border border-purple-600/20 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300">
      <Link to={`/watch/${video.id}`}>
        <div className="relative group">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {video.duration}
          </span>
          {video.isPremium && (
            <div className="absolute top-2 left-2 bg-gradient-gold text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Crown className="w-3 h-3" />
              <span>Premium</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex space-x-3">
          <Link to={`/profile/${video.channel.id}`}>
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full border-2 border-purple-600/30 hover:border-gold-500/50 transition-colors"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/watch/${video.id}`}>
              <h3 className="font-medium text-white line-clamp-2 hover:text-gold-300 transition-colors mb-1">
                {video.title}
              </h3>
            </Link>
            <div className="flex items-center space-x-1 mb-1">
              <Link 
                to={`/profile/${video.channel.id}`}
                className="text-gray-400 text-sm hover:text-white transition-colors"
              >
                {video.channel.name}
              </Link>
              {video.channel.verified && (
                <CheckCircle className="w-3 h-3 text-purple-400" />
              )}
            </div>
            <div className="text-gray-400 text-sm">
              {formatViews(video.views)} • {formatDate(video.uploadDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;