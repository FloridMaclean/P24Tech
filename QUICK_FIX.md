# Quick Fix for Chunk Loading 404 Errors

## The Problem
Chunks are returning 404 because either:
1. The build wasn't run on the server
2. Standalone mode was misconfigured

## The Solution (3 Steps)

### Step 1: SSH into Your Server

```bash
ssh your-username@your-server-ip
cd ~/domains/port24.tech/public_html
```

### Step 2: Pull Latest Code and Build

```bash
# Pull latest changes
git pull origin main

# Remove old build
rm -rf .next

# Install dependencies
npm install --production

# Build the application (THIS IS CRITICAL!)
npm run build

# Verify chunks exist
ls -la .next/static/chunks/ | head -5
# Should show .js files

# Set permissions
chmod -R 755 .next
```

### Step 3: Update Hostinger Node.js Settings

**In Hostinger hPanel → Node.js:**

1. **Application Startup File:** 
   ```
   node_modules/next/dist/bin/next
   ```

2. **Application Startup Options:** 
   ```
   start -p ${PORT:-3000}
   ```

3. **Application Root:** 
   ```
   /domains/port24.tech/public_html
   ```

4. **Restart** the application

### Step 4: Test

1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Visit: `https://port24.tech`
3. Check browser console - should see no chunk errors
4. Test chunk URL: `https://port24.tech/_next/static/chunks/webpack-*.js` (should return JS, not 404)

## What Changed

- **Disabled standalone mode** - This was causing routing issues
- **Using standard Next.js server** - More reliable for Hostinger
- **Added deployment script** - Run `./deploy.sh` for automated deployment

## If You Still Get Errors

1. **Verify build completed:**
   ```bash
   ls -la .next/static/chunks/
   # Should show many .js files
   ```

2. **Check Node.js version:**
   ```bash
   node --version
   # Should be 18.x or higher
   ```

3. **Check application is running:**
   ```bash
   # In Hostinger, verify app is "Running" status
   ```

4. **Check logs:**
   ```bash
   # If using PM2
   pm2 logs port24-technologies
   ```

## One-Line Fix

If you just want to rebuild quickly:

```bash
cd ~/domains/port24.tech/public_html && git pull && rm -rf .next && npm install --production && npm run build && chmod -R 755 .next && echo "✅ Build complete! Restart your Node.js app in Hostinger."
```

