# VTEEMO Frontend Deployment Script
# نسخه PowerShell برای ویندوز

param(
    [string]$AppName = "vteemo",
    [switch]$SkipBuild,
    [switch]$TestOnly
)

Write-Host "🚀 VTEEMO Frontend Deployment Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# بررسی وجود Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# بررسی وجود npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found." -ForegroundColor Red
    exit 1
}

# نصب dependencies (اگر node_modules وجود نداشته باشد)
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# اگر فقط تست باشد
if ($TestOnly) {
    Write-Host "🧪 Running tests only..." -ForegroundColor Yellow
    
    # Type check
    Write-Host "Checking TypeScript..." -ForegroundColor Blue
    npm run type-check
    
    # Lint
    Write-Host "Running linter..." -ForegroundColor Blue  
    npm run lint
    
    Write-Host "✅ All tests passed!" -ForegroundColor Green
    exit 0
}

# Build برای Production (اگر --skip-build نیست)
if (-not $SkipBuild) {
    Write-Host "🏗️ Building for production..." -ForegroundColor Yellow
    
    # پاک کردن dist قبلی
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force "dist"
        Write-Host "🧹 Cleaned previous build" -ForegroundColor Blue
    }
    
    # Build
    npm run build:prod
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed" -ForegroundColor Red
        exit 1
    }
    
    # بررسی وجود فایل‌های build
    if (-not (Test-Path "dist/index.html")) {
        Write-Host "❌ Build output missing (dist/index.html not found)" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
}

# بررسی وجود Liara CLI
try {
    liara --version | Out-Null
    Write-Host "✅ Liara CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Liara CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g @liara/cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Liara CLI" -ForegroundColor Red
        exit 1
    }
}

# Deploy به Liara
Write-Host "🚀 Deploying to Liara..." -ForegroundColor Yellow
Write-Host "App name: $AppName" -ForegroundColor Blue
Write-Host "Path: dist" -ForegroundColor Blue

liara deploy --app $AppName --path dist
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "" 
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "" 
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Check your app: https://$AppName.liara.run" -ForegroundColor White
Write-Host "2. Test API connection: https://$AppName.liara.run/test" -ForegroundColor White
Write-Host "3. If using custom domain, check: https://vteemo.com" -ForegroundColor White
Write-Host ""
Write-Host "🔍 Troubleshooting:" -ForegroundColor Cyan  
Write-Host "- If white page: Check browser console" -ForegroundColor White
Write-Host "- If API issues: Visit /test page" -ForegroundColor White
Write-Host "- If domain issues: Check DNS propagation" -ForegroundColor White
Write-Host ""

# نمایش اطلاعات پروژه
Write-Host "📊 Project info:" -ForegroundColor Cyan
Write-Host "Frontend: https://vteemo.com" -ForegroundColor White
Write-Host "Backend: https://vteemo-backend.liara.run" -ForegroundColor White
Write-Host "Test page: https://vteemo.com/test" -ForegroundColor White