# VTEEMO Frontend Deployment Guide 🚀

این راهنمای کامل برای deploy کردن فرانت‌اند VTEEMO روی پلتفرم Liara است.

## 📋 پیش‌نیازها

- Node.js (نسخه 18+)
- npm (نسخه 8+)
- Liara CLI
- اکانت Liara.ir

## 🔧 تنظیمات اولیه

### 1. کلون پروژه
```bash
git clone https://github.com/takmob66/vteemo.Premium-v1.git
cd vteemo.Premium-v1
```

### 2. نصب Dependencies
```bash
npm install
```

### 3. تنظیم متغیرهای محیطی
فایل `.env.production` از قبل موجود است و شامل:
```env
VITE_API_ENDPOINT=https://vteemo-backend.liara.run/api
VITE_APP_URL=https://vteemo.com
VITE_APP_NAME=VTEEMO
VITE_APP_VERSION=1.0.0
```

## 🏗️ Build و Deploy

### 1. Build برای Production
```bash
npm run build:prod
```

### 2. تست محلی (اختیاری)
```bash
npm run preview
```

### 3. Deploy به Liara
```bash
# نصب Liara CLI (اگر نصب نیست)
npm install -g @liara/cli

# لاگین به Liara
liara login

# Deploy
liara deploy --app vteemo --path dist
```

## 🌐 تنظیمات Domain

### 1. در پنل Liara:
1. وارد app `vteemo` شوید
2. برو به تب "Domain" 
3. دامنه `vteemo.com` رو اضافه کن
4. منتظر تأیید DNS باش

### 2. تنظیمات DNS در CloudFlare:
```
Type: CNAME
Name: vteemo.com (یا @)
Value: vteemo.liara.run
```

## 🧪 تست اتصال

بعد از deploy، این URLها رو تست کنید:

1. **مستقیم Liara:** https://vteemo.liara.run
2. **دامنه اصلی:** https://vteemo.com  
3. **تست API:** https://vteemo.com/test

## 📁 ساختار فایل‌های مهم

```
.
├── .env.production          # متغیرهای محیطی
├── liara.json              # تنظیمات Liara
├── package.json            # Scripts و dependencies  
├── vite.config.ts          # تنظیمات Vite
├── src/
│   ├── services/
│   │   ├── apiService.ts   # سرویس API
│   │   └── connectionTester.ts
│   ├── pages/
│   │   └── ConnectionTest.tsx
│   └── ...
└── dist/                   # خروجی build
```

## 🔍 عیب‌یابی

### مشکل صفحه سفید:
```bash
# بررسی build
npm run build:prod
dir dist

# چک کردن فایل‌های dist
dir dist\\assets
```

### مشکل اتصال API:
1. برو به `/test` در مرورگر
2. کلیک روی "Quick Test" یا "Full Test"
3. نتایج رو بررسی کن

### مشکل DNS:
```bash
# تست DNS
nslookup vteemo.com

# اگر هنوز propagate نشده، از URL مستقیم استفاده کن:
https://vteemo.liara.run
```

## 📝 Scripts مفید

```bash
# Development
npm run dev                 # شروع dev server

# Build
npm run build              # Build معمولی
npm run build:prod         # Build production
npm run build:dev          # Build development

# Testing
npm run lint               # بررسی کد
npm run lint:fix           # اصلاح خودکار
npm run type-check         # بررسی TypeScript

# Utilities  
npm run clean              # پاک کردن dist
npm run preview            # پیش‌نمایش build
```

## 🚨 نکات مهم

1. **همیشه از `npm run build:prod` استفاده کنید**
2. **بعد از هر تغییر، دوباره build و deploy کنید**
3. **DNS ممکن است تا 48 ساعت طول بکشد**
4. **برای تست فوری از URL مستقیم Liara استفاده کنید**

## 🔄 به‌روزرسانی

برای به‌روزرسانی:
```bash
git pull origin main
npm install
npm run build:prod  
liara deploy --app vteemo --path dist
```

## 📞 پشتیبانی

در صورت مشکل:
1. لاگ‌های مرورگر رو چک کنید
2. صفحه `/test` رو بررسی کنید  
3. مطمئن شوید بک‌اند در دسترس است
4. DNS propagation رو بررسی کنید

---

✅ **موفقیت:** اگر همه مراحل درست انجام شود، فرانت‌اند شما روی `https://vteemo.com` در دسترس خواهد بود.