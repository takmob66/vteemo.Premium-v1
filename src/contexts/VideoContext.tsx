import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  description: string;
  likes: number;
  dislikes: number;
  category: string;
  tags: string[];
  status: 'published' | 'pending' | 'rejected';
  isPremium?: boolean;
}

interface VideoContextType {
  videos: Video[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  getVideoById: (id: string) => Video | undefined;
  addVideo: (video: Omit<Video, 'id' | 'uploadDate' | 'views' | 'likes' | 'dislikes'>) => void;
  updateVideoStatus: (id: string, status: Video['status']) => void;
  deleteVideo: (id: string) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Amazing Sunset Timelapse in 4K - Premium Content',
    thumbnail: 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '3:45',
    views: 2500000,
    uploadDate: '2024-01-15',
    channel: {
      id: 'ch1',
      name: 'Nature Films',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    description: 'Watch this breathtaking 4K sunset timelapse captured over the mountains. Premium exclusive content with enhanced quality.',
    likes: 45000,
    dislikes: 890,
    category: 'Nature',
    tags: ['sunset', 'timelapse', '4k', 'nature', 'premium'],
    status: 'published',
    isPremium: true
  },
  {
    id: '2',
    title: 'Modern Web Development Tutorial - React & TypeScript',
    thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '15:20',
    views: 850000,
    uploadDate: '2024-01-10',
    channel: {
      id: 'ch2',
      name: 'Code Academy',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    description: 'Learn modern web development techniques with React and TypeScript. Complete tutorial for beginners.',
    likes: 12000,
    dislikes: 245,
    category: 'Technology',
    tags: ['programming', 'react', 'typescript', 'tutorial'],
    status: 'published'
  },
  {
    id: '3',
    title: 'Cooking the Perfect Pasta - Italian Style',
    thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '8:15',
    views: 1200000,
    uploadDate: '2024-01-12',
    channel: {
      id: 'ch3',
      name: 'Chef\'s Kitchen',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: false
    },
    description: 'Master the art of cooking perfect pasta with this step-by-step guide from Italian chefs.',
    likes: 25000,
    dislikes: 310,
    category: 'Cooking',
    tags: ['cooking', 'pasta', 'recipe', 'italian'],
    status: 'published'
  },
  {
    id: '4',
    title: 'Epic Gaming Montage - Premium Highlights',
    thumbnail: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '12:30',
    views: 3200000,
    uploadDate: '2024-01-08',
    channel: {
      id: 'ch4',
      name: 'Pro Gamer',
      avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    description: 'Best gaming moments compilation with exclusive premium content and behind-the-scenes footage.',
    likes: 89000,
    dislikes: 1200,
    category: 'Gaming',
    tags: ['gaming', 'montage', 'highlights', 'premium'],
    status: 'published',
    isPremium: true
  },
  {
    id: '5',
    title: 'Relaxing Music for Study and Work',
    thumbnail: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '45:00',
    views: 5600000,
    uploadDate: '2024-01-05',
    channel: {
      id: 'ch5',
      name: 'Peaceful Sounds',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true
    },
    description: 'Perfect background music for studying, working, or relaxing. High-quality audio experience.',
    likes: 156000,
    dislikes: 2100,
    category: 'Music',
    tags: ['music', 'relaxing', 'study', 'work', 'ambient'],
    status: 'published'
  }
];

export const VideoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getVideoById = (id: string) => videos.find(video => video.id === id);

  const addVideo = (videoData: Omit<Video, 'id' | 'uploadDate' | 'views' | 'likes' | 'dislikes'>) => {
    const newVideo: Video = {
      ...videoData,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      dislikes: 0,
    };
    setVideos(prev => [newVideo, ...prev]);
  };

  const updateVideoStatus = (id: string, status: Video['status']) => {
    setVideos(prev => prev.map(video => 
      video.id === id ? { ...video, status } : video
    ));
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(video => video.id !== id));
  };

  const value = {
    videos,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    getVideoById,
    addVideo,
    updateVideoStatus,
    deleteVideo
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};