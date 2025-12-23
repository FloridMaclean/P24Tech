#!/bin/bash

# Deployment script for Hostinger
# This script ensures the build is complete and correct

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "📁 Current directory: $(pwd)"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

echo "🧹 Cleaning old build..."
rm -rf .next
rm -rf node_modules/.cache

echo "📦 Installing dependencies..."
npm install --production

echo "🔨 Building application..."
npm run build

echo "✅ Verifying build output..."

# Check if .next folder exists
if [ ! -d ".next" ]; then
    echo "❌ Error: .next folder not found after build!"
    exit 1
fi

# Check if static chunks exist
if [ ! -d ".next/static/chunks" ]; then
    echo "❌ Error: .next/static/chunks folder not found!"
    echo "This means the build didn't complete correctly."
    exit 1
fi

# Count chunk files
CHUNK_COUNT=$(find .next/static/chunks -name "*.js" | wc -l | tr -d ' ')
echo "📊 Found $CHUNK_COUNT JavaScript chunk files"

if [ "$CHUNK_COUNT" -eq 0 ]; then
    echo "❌ Error: No chunk files found! Build may have failed."
    exit 1
fi

echo "🔐 Setting permissions..."
chmod -R 755 .next
chmod -R 755 .next/static

echo "✅ Build verification complete!"
echo ""
echo "📋 Next steps:"
echo "1. Restart your Node.js application in Hostinger hPanel"
echo "2. Or if using PM2: pm2 restart port24-technologies"
echo "3. Clear browser cache and test the website"
echo ""
echo "🔍 To verify chunks are accessible, test:"
echo "   https://port24.tech/_next/static/chunks/webpack-*.js"
echo "   (Should return JavaScript, not 404)"

