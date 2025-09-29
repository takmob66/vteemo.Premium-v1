# Quick Fix Script for VTEEMO Routing Issues
# اسکریپت سریع برای حل مشکلات Routing

Write-Host "🔧 VTEEMO Routing Quick Fix" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

# Step 1: Check current directory
$currentDir = Get-Location
Write-Host "📁 Current directory: $currentDir" -ForegroundColor Blue

if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in project root. Please navigate to the project folder first." -ForegroundColor Red
    Write-Host "Example: cd c:\vteemo\frontend-vteemo" -ForegroundColor Yellow
    exit 1
}

# Step 2: Update from git
Write-Host "📥 Updating from Git..." -ForegroundColor Yellow
git pull origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Warning: Git pull failed. Continuing anyway..." -ForegroundColor Yellow
}

# Step 3: Install dependencies
Write-Host "📦 Installing/Updating dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" -ForegroundColor Red
    exit 1
}

# Step 4: Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Previous build cleaned" -ForegroundColor Green
}

# Step 5: Build for production
Write-Host "🏗️ Building for production..." -ForegroundColor Yellow
npm run build:prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Step 6: Verify build output
Write-Host "🔍 Verifying build output..." -ForegroundColor Yellow
if (Test-Path "dist/index.html") {
    Write-Host "✅ index.html found" -ForegroundColor Green
} else {
    Write-Host "❌ index.html missing" -ForegroundColor Red
    exit 1
}

if (Test-Path "dist/assets") {
    $assetCount = (Get-ChildItem "dist/assets").Count
    Write-Host "✅ Assets folder found with $assetCount files" -ForegroundColor Green
} else {
    Write-Host "❌ Assets folder missing" -ForegroundColor Red
    exit 1
}

# Step 7: Deploy to Liara
Write-Host "🚀 Deploying to Liara..." -ForegroundColor Yellow
liara deploy --app vteemo --path dist
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    exit 1
}

# Step 8: Success message
Write-Host ""
Write-Host "🎉 Routing fix completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 Test these URLs now:" -ForegroundColor Cyan
Write-Host "1. Main app: https://vteemo.liara.run" -ForegroundColor White
Write-Host "2. API test: https://vteemo.liara.run/test" -ForegroundColor White  
Write-Host "3. Premium: https://vteemo.liara.run/premium" -ForegroundColor White
Write-Host "4. Upload: https://vteemo.liara.run/upload" -ForegroundColor White
Write-Host "5. Rewards: https://vteemo.liara.run/rewards" -ForegroundColor White
Write-Host ""
Write-Host "🔍 Debug tips:" -ForegroundColor Cyan
Write-Host "- Open Browser Console (F12)" -ForegroundColor White
Write-Host "- Look for navigation debug messages starting with 🔗" -ForegroundColor White
Write-Host "- Clear browser cache (Ctrl+F5)" -ForegroundColor White
Write-Host "- Test in Incognito mode" -ForegroundColor White
Write-Host ""
Write-Host "📞 If still not working:" -ForegroundColor Cyan
Write-Host "1. Wait 2-3 minutes for deployment" -ForegroundColor White
Write-Host "2. Clear browser cache completely" -ForegroundColor White  
Write-Host "3. Try different browser" -ForegroundColor White
Write-Host "4. Check /test page for API status" -ForegroundColor White