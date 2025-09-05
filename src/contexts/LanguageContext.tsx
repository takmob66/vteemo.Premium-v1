import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fa' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  fa: {
    // Header
    'header.search': 'جستجوی ویدیوها...',
    'header.upload': 'آپلود ویدیو',
    'header.notifications': 'اعلان‌ها',
    'header.signin': 'ورود',
    'header.signout': 'خروج',
    'header.profile': 'پروفایل من',
    'header.admin': 'پنل مدیریت',
    
    // Sidebar
    'sidebar.home': 'خانه',
    'sidebar.trending': 'ترند',
    'sidebar.music': 'موسیقی',
    'sidebar.gaming': 'بازی',
    'sidebar.movies': 'فیلم',
    'sidebar.sports': 'ورزش',
    'sidebar.technology': 'تکنولوژی',
    'sidebar.fashion': 'مد و زیبایی',
    'sidebar.education': 'آموزش',
    'sidebar.entertainment': 'سرگرمی',
    'sidebar.premium': 'اشتراک ویژه',
    'sidebar.rewards': 'پاداش‌ها',
    
    // Video
    'video.views': 'بازدید',
    'video.ago': 'پیش',
    'video.like': 'پسندیدن',
    'video.dislike': 'نپسندیدن',
    'video.share': 'اشتراک‌گذاری',
    'video.download': 'دانلود',
    'video.subscribe': 'اشتراک',
    'video.subscribed': 'عضو شده',
    'video.comments': 'نظرات',
    'video.addComment': 'نظر خود را بنویسید...',
    'video.comment': 'ارسال نظر',
    
    // Upload
    'upload.title': 'آپلود ویدیو',
    'upload.selectFile': 'انتخاب فایل',
    'upload.dragDrop': 'یا فایل را اینجا بکشید',
    'upload.videoTitle': 'عنوان ویدیو',
    'upload.description': 'توضیحات',
    'upload.category': 'دسته‌بندی',
    'upload.tags': 'برچسب‌ها',
    'upload.thumbnail': 'تصویر شاخص',
    'upload.cancel': 'لغو',
    'upload.publish': 'انتشار',
    
    // Login
    'login.title': 'ورود به حساب',
    'login.email': 'ایمیل',
    'login.password': 'رمز عبور',
    'login.signin': 'ورود',
    'login.demo': 'حساب‌های نمونه:',
    'login.admin': 'مدیر',
    'login.user': 'کاربر',
    
    // Profile
    'profile.subscribers': 'مشترک',
    'profile.totalViews': 'کل بازدیدها',
    'profile.videos': 'ویدیو',
    'profile.playlists': 'لیست‌های پخش',
    'profile.about': 'درباره',
    'profile.noVideos': 'هنوز ویدیویی آپلود نشده',
    
    // Admin
    'admin.dashboard': 'داشبورد',
    'admin.users': 'کاربران',
    'admin.videos': 'ویدیوها',
    'admin.analytics': 'آمار و تحلیل',
    'admin.totalVideos': 'کل ویدیوها',
    'admin.totalUsers': 'کل کاربران',
    'admin.totalViews': 'کل بازدیدها',
    'admin.pendingReview': 'در انتظار بررسی',
    
    // Premium
    'premium.title': 'اشتراک ویژه',
    'premium.subtitle': 'تجربه بی‌نظیر تماشای ویدیو',
    'premium.noAds': 'بدون تبلیغات',
    'premium.hd': 'کیفیت HD',
    'premium.offline': 'تماشای آفلاین',
    'premium.exclusive': 'محتوای اختصاصی',
    'premium.price': '۹۹,۰۰۰ تومان/ماه',
    'premium.subscribe': 'خرید اشتراک',
    
    // Rewards
    'rewards.title': 'پاداش‌ها',
    'rewards.subtitle': 'امتیاز جمع کنید و جوایز بگیرید',
    'rewards.points': 'امتیاز شما',
    'rewards.watchVideo': 'تماشای ویدیو',
    'rewards.uploadVideo': 'آپلود ویدیو',
    'rewards.shareVideo': 'اشتراک‌گذاری',
    'rewards.dailyLogin': 'ورود روزانه',
    
    // Common
    'common.loading': 'در حال بارگذاری...',
    'common.error': 'خطا',
    'common.success': 'موفق',
    'common.cancel': 'لغو',
    'common.save': 'ذخیره',
    'common.delete': 'حذف',
    'common.edit': 'ویرایش',
    'common.view': 'مشاهده',
    'common.back': 'بازگشت',
    'common.next': 'بعدی',
    'common.previous': 'قبلی',
  },
  
  en: {
    // Header
    'header.search': 'Search videos...',
    'header.upload': 'Upload Video',
    'header.notifications': 'Notifications',
    'header.signin': 'Sign In',
    'header.signout': 'Sign Out',
    'header.profile': 'My Profile',
    'header.admin': 'Admin Panel',
    
    // Sidebar
    'sidebar.home': 'Home',
    'sidebar.trending': 'Trending',
    'sidebar.music': 'Music',
    'sidebar.gaming': 'Gaming',
    'sidebar.movies': 'Movies',
    'sidebar.sports': 'Sports',
    'sidebar.technology': 'Technology',
    'sidebar.fashion': 'Fashion',
    'sidebar.education': 'Education',
    'sidebar.entertainment': 'Entertainment',
    'sidebar.premium': 'Premium',
    'sidebar.rewards': 'Rewards',
    
    // Video
    'video.views': 'views',
    'video.ago': 'ago',
    'video.like': 'Like',
    'video.dislike': 'Dislike',
    'video.share': 'Share',
    'video.download': 'Download',
    'video.subscribe': 'Subscribe',
    'video.subscribed': 'Subscribed',
    'video.comments': 'Comments',
    'video.addComment': 'Add a public comment...',
    'video.comment': 'Comment',
    
    // Upload
    'upload.title': 'Upload Video',
    'upload.selectFile': 'Select File',
    'upload.dragDrop': 'Or drag and drop a file',
    'upload.videoTitle': 'Video Title',
    'upload.description': 'Description',
    'upload.category': 'Category',
    'upload.tags': 'Tags',
    'upload.thumbnail': 'Thumbnail',
    'upload.cancel': 'Cancel',
    'upload.publish': 'Publish',
    
    // Login
    'login.title': 'Sign In',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.signin': 'Sign In',
    'login.demo': 'Demo Accounts:',
    'login.admin': 'Admin',
    'login.user': 'User',
    
    // Profile
    'profile.subscribers': 'subscribers',
    'profile.totalViews': 'total views',
    'profile.videos': 'videos',
    'profile.playlists': 'Playlists',
    'profile.about': 'About',
    'profile.noVideos': 'No videos uploaded yet',
    
    // Admin
    'admin.dashboard': 'Dashboard',
    'admin.users': 'Users',
    'admin.videos': 'Videos',
    'admin.analytics': 'Analytics',
    'admin.totalVideos': 'Total Videos',
    'admin.totalUsers': 'Total Users',
    'admin.totalViews': 'Total Views',
    'admin.pendingReview': 'Pending Review',
    
    // Premium
    'premium.title': 'Premium Subscription',
    'premium.subtitle': 'Ultimate video watching experience',
    'premium.noAds': 'Ad-free',
    'premium.hd': 'HD Quality',
    'premium.offline': 'Offline Viewing',
    'premium.exclusive': 'Exclusive Content',
    'premium.price': '$9.99/month',
    'premium.subscribe': 'Subscribe Now',
    
    // Rewards
    'rewards.title': 'Rewards',
    'rewards.subtitle': 'Earn points and get rewards',
    'rewards.points': 'Your Points',
    'rewards.watchVideo': 'Watch Video',
    'rewards.uploadVideo': 'Upload Video',
    'rewards.shareVideo': 'Share Video',
    'rewards.dailyLogin': 'Daily Login',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  },
  
  ar: {
    // Header
    'header.search': 'البحث عن الفيديوهات...',
    'header.upload': 'رفع فيديو',
    'header.notifications': 'الإشعارات',
    'header.signin': 'تسجيل الدخول',
    'header.signout': 'تسجيل الخروج',
    'header.profile': 'ملفي الشخصي',
    'header.admin': 'لوحة الإدارة',
    
    // Sidebar
    'sidebar.home': 'الرئيسية',
    'sidebar.trending': 'الأكثر رواجاً',
    'sidebar.music': 'الموسيقى',
    'sidebar.gaming': 'الألعاب',
    'sidebar.movies': 'الأفلام',
    'sidebar.sports': 'الرياضة',
    'sidebar.technology': 'التكنولوجيا',
    'sidebar.fashion': 'الموضة',
    'sidebar.education': 'التعليم',
    'sidebar.entertainment': 'الترفيه',
    'sidebar.premium': 'الاشتراك المميز',
    'sidebar.rewards': 'المكافآت',
    
    // Video
    'video.views': 'مشاهدة',
    'video.ago': 'منذ',
    'video.like': 'إعجاب',
    'video.dislike': 'عدم إعجاب',
    'video.share': 'مشاركة',
    'video.download': 'تحميل',
    'video.subscribe': 'اشتراك',
    'video.subscribed': 'مشترك',
    'video.comments': 'التعليقات',
    'video.addComment': 'أضف تعليقاً عاماً...',
    'video.comment': 'تعليق',
    
    // Upload
    'upload.title': 'رفع فيديو',
    'upload.selectFile': 'اختر ملف',
    'upload.dragDrop': 'أو اسحب وأفلت ملف',
    'upload.videoTitle': 'عنوان الفيديو',
    'upload.description': 'الوصف',
    'upload.category': 'الفئة',
    'upload.tags': 'العلامات',
    'upload.thumbnail': 'الصورة المصغرة',
    'upload.cancel': 'إلغاء',
    'upload.publish': 'نشر',
    
    // Login
    'login.title': 'تسجيل الدخول',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.signin': 'تسجيل الدخول',
    'login.demo': 'حسابات تجريبية:',
    'login.admin': 'مدير',
    'login.user': 'مستخدم',
    
    // Profile
    'profile.subscribers': 'مشترك',
    'profile.totalViews': 'إجمالي المشاهدات',
    'profile.videos': 'فيديو',
    'profile.playlists': 'قوائم التشغيل',
    'profile.about': 'حول',
    'profile.noVideos': 'لم يتم رفع أي فيديو بعد',
    
    // Admin
    'admin.dashboard': 'لوحة التحكم',
    'admin.users': 'المستخدمون',
    'admin.videos': 'الفيديوهات',
    'admin.analytics': 'التحليلات',
    'admin.totalVideos': 'إجمالي الفيديوهات',
    'admin.totalUsers': 'إجمالي المستخدمين',
    'admin.totalViews': 'إجمالي المشاهدات',
    'admin.pendingReview': 'في انتظار المراجعة',
    
    // Premium
    'premium.title': 'الاشتراك المميز',
    'premium.subtitle': 'تجربة مشاهدة فيديو مثالية',
    'premium.noAds': 'بدون إعلانات',
    'premium.hd': 'جودة عالية',
    'premium.offline': 'مشاهدة بدون اتصال',
    'premium.exclusive': 'محتوى حصري',
    'premium.price': '٩.٩٩ دولار/شهر',
    'premium.subscribe': 'اشترك الآن',
    
    // Rewards
    'rewards.title': 'المكافآت',
    'rewards.subtitle': 'اكسب النقاط واحصل على المكافآت',
    'rewards.points': 'نقاطك',
    'rewards.watchVideo': 'مشاهدة فيديو',
    'rewards.uploadVideo': 'رفع فيديو',
    'rewards.shareVideo': 'مشاركة فيديو',
    'rewards.dailyLogin': 'تسجيل دخول يومي',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'fa' || language === 'ar';

  const value = {
    language,
    setLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={`font-${language}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};