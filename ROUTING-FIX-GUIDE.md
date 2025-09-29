# 🔧 راهنمای حل مشکل Routing در VTEEMO

این راهنما برای حل مشکل "لینکها کار نمی‌کند" در فرانت‌اند VTEEMO است.

## 🚨 مشکلات رایج Routing

### ۱. مشکل: کلیک روی لینک‌ها صفحه‌ای باز نمی‌شود
**علت:** تنظیمات SPA routing در سرور
**حل:** فایل‌های زیر اضافه شده‌اند:

- ✅ `public/_redirects` - برای redirect های SPA
- ✅ `liara.json` - تنظیمات fallback به index.html
- ✅ `public/index.html` - fallback مناسب

### ۲. مشکل: Refresh صفحه 404 می‌دهد
**علت:** Server نمی‌تواند route های client-side را handle کند
**حل:** 
```json
// liara.json
{
  "spa": true,
  "fallback": "index.html",
  "redirects": [
    {
      "source": "/*",
      "destination": "/index.html", 
      "statusCode": 200
    }
  ]
}
```

### ۳. مشکل: Loading بی‌پایان
**علت:** JavaScript bundle load نمی‌شود
**حل:** بررسی کنید:
- فایل‌های dist موجود هستند
- Build موفقیت‌آمیز بوده
- Network errors در Developer Tools

## 🔍 مراحل عیب‌یابی

### مرحله ۱: بررسی Build
```bash
cd c:\vteemo\frontend-vteemo
git pull origin main
npm install
npm run build:prod

# بررسی خروجی
dir dist
dir dist\assets
```

### مرحله ۲: تست محلی
```bash
npm run preview
```
اگر محلی کار کرد، مشکل در deployment است.

### مرحله ۳: Deploy مجدد
```bash
liara deploy --app vteemo --path dist
```

### مرحله ۴: تست URLها

بعد از deploy:

1. **صفحه اصلی:** https://vteemo.liara.run
2. **تست routing:** https://vteemo.liara.run/test  
3. **Premium page:** https://vteemo.liara.run/premium
4. **Upload page:** https://vteemo.liara.run/upload

### مرحله ۵: بررسی Network Tab

در Developer Tools:
1. F12 → Network tab
2. Refresh صفحه
3. بررسی کنید:
   - `index.html` load می‌شود (200 OK)
   - فایل‌های JS load می‌شوند (200 OK)
   - هیچ 404 error نباشد

## 🛠️ حل‌های سریع

### حل ۱: Force Refresh
```bash
Ctrl + F5  # در مرورگر
```

### حل ۲: Clear Cache
1. Developer Tools → Application
2. Storage → Clear storage
3. Clear site data

### حل ۳: Test در Incognito/Private Mode
Chrome/Edge: `Ctrl + Shift + N`

### حل ۴: Test URL مستقیم
به جای کلیک روی لینک، URL رو مستقیماً type کنید:
```
https://vteemo.liara.run/premium
https://vteemo.liara.run/upload
https://vteemo.liara.run/test
```

## 📱 تست در مرورگرهای مختلف

- ✅ Chrome
- ✅ Firefox  
- ✅ Edge
- ✅ Safari (Mac)
- ✅ Mobile browsers

## 🔧 تنظیمات اضافی

### اگر همچنان کار نکرد:

#### ۱. بررسی Console Errors
```javascript
// در Developer Console
console.log(window.location.pathname);
console.log(document.getElementById('root'));
```

#### ۲. فعال‌سازی Debug Mode
فایل `.env.local` بسازید:
```env
VITE_DEBUG=true
VITE_LOG_LEVEL=debug
```

#### ۳. تست با Hash Router
اگر مشکل ادامه داشت، موقتاً از Hash Router استفاده کنید:

```typescript
// src/main.tsx - موقتی
import { HashRouter } from 'react-router-dom';

// جایگزین BrowserRouter با HashRouter
<HashRouter>
  <App />
</HashRouter>
```

## 🚀 Deploy Script خودکار

برای اطمینان از deploy صحیح:
```powershell
# اجرای script خودکار
.\deploy-frontend.ps1

# یا manual:
npm run build:prod
liara deploy --app vteemo --path dist
```

## 📞 نکات مهم

1. **همیشه بعد از تغییرات git pull کنید**
2. **قبل از deploy، build محلی تست کنید**  
3. **Cache مرورگر رو clear کنید**
4. **از URL مستقیم Liara برای تست استفاده کنید**
5. **DNS propagation زمان می‌برد**

## ✅ چک‌لیست نهایی

- [ ] Git pull انجام شده
- [ ] npm install اجرا شده  
- [ ] npm run build:prod موفق بوده
- [ ] فایل dist/index.html موجود است
- [ ] liara deploy موفق بوده
- [ ] https://vteemo.liara.run/test کار می‌کند
- [ ] Navigation links کلیک می‌شوند
- [ ] URL مستقیم کار می‌کند
- [ ] Console errors وجود ندارد

اگر همه مراحل انجام شد و همچنان مشکل دارید، مشکل احتمالاً از طرف سرور یا DNS است.