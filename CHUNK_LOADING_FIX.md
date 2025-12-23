# Fix Chunk Loading 404 Errors

## Problem
Getting 404 errors for JavaScript chunks like:
- `/_next/static/chunks/279-d45ee6bea9d2e7a9.js` → 404
- `/_next/static/chunks/454-9a550d9d2e02e3fd.js` → 404
- `/_next/static/chunks/app/page-8c4d761227aeba04.js` → 404

This causes: "Application error: a client-side exception has occurred"

## Root Cause
The `.next` folder with static chunks is missing or not accessible on the production server. This happens when:
1. The build wasn't run on the server after deployment
2. The `.next` folder wasn't uploaded/copied to the server
3. File permissions prevent access to the `.next` folder

## Solution (CRITICAL - Do This First!)

### Step 1: SSH into Your Hostinger Server

```bash
ssh your-username@your-server-ip
cd ~/domains/port24.tech/public_html  # or your actual path
```

### Step 2: Verify You're in the Right Directory

```bash
# Should show package.json, next.config.js, etc.
ls -la
```

### Step 3: Remove Old Build (If Exists)

```bash
rm -rf .next
rm -rf node_modules/.cache
```

### Step 4: Install Dependencies (If Needed)

```bash
npm install --production
```

### Step 5: Build the Application (CRITICAL!)

```bash
npm run build
```

**This step is ESSENTIAL!** The build creates the `.next` folder with all the chunk files.

### Step 6: Verify Build Output

```bash
# Check that .next folder exists
ls -la .next/

# Check that static chunks exist
ls -la .next/static/chunks/ | head -20

# Should show .js files like:
# 279-d45ee6bea9d2e7a9.js
# 454-9a550d9d2e02e3fd.js
# etc.
```

### Step 7: Set Correct Permissions

```bash
# Make sure .next folder is readable
chmod -R 755 .next
chmod -R 755 .next/static
```

### Step 8: Restart Your Node.js Application

**In Hostinger hPanel:**
1. Go to **Node.js** section
2. **Stop** the application
3. **Start** the application again

**Or via SSH/PM2:**
```bash
pm2 restart port24-technologies
# or
pm2 restart all
```

### Step 9: Clear Browser Cache

1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache completely
3. Test in incognito/private mode

## Verification

### Check 1: Test Chunk URL Directly

Open in browser:
```
https://port24.tech/_next/static/chunks/webpack-8db40c0f0ce1f953.js
```

**Should return:** JavaScript code (not HTML error page)
**Should NOT return:** 404 or HTML error page

### Check 2: Browser Console

1. Open browser console (F12)
2. Go to Network tab
3. Reload the page
4. Look for requests to `/_next/static/chunks/*.js`
5. All should show **200 OK** (not 404)

### Check 3: Application Works

The website should load without "Application error" message.

## If Using Standalone Mode

If you're using `output: 'standalone'` in `next.config.js`, the structure is different:

```bash
# After build, check standalone folder
ls -la .next/standalone/

# Static files should be in:
.next/standalone/.next/static/
```

Make sure your Node.js app is serving from the correct directory.

## Common Mistakes

### ❌ Mistake 1: Not Building on Server
**Wrong:** Uploading code and expecting it to work
**Correct:** Must run `npm run build` on the server

### ❌ Mistake 2: Building Locally and Uploading .next
**Wrong:** Building locally and uploading `.next` folder
**Correct:** Build on the server (paths and optimizations are server-specific)

### ❌ Mistake 3: Wrong Working Directory
**Wrong:** Node.js app running from wrong directory
**Correct:** App must run from project root (where `package.json` is)

### ❌ Mistake 4: Missing Dependencies
**Wrong:** Not installing dependencies before building
**Correct:** Run `npm install` before `npm run build`

## Quick Fix Script

Create this script on your server (`fix-chunks.sh`):

```bash
#!/bin/bash
cd ~/domains/port24.tech/public_html
echo "Removing old build..."
rm -rf .next
echo "Installing dependencies..."
npm install --production
echo "Building application..."
npm run build
echo "Setting permissions..."
chmod -R 755 .next
echo "Build complete! Restart your Node.js app."
```

Make it executable and run:
```bash
chmod +x fix-chunks.sh
./fix-chunks.sh
```

## Still Not Working?

### Check Server Logs

```bash
# PM2 logs
pm2 logs port24-technologies

# Or Hostinger error logs
tail -f ~/logs/error.log
```

### Check File Structure

```bash
# Should see:
# - package.json
# - next.config.js
# - .next/ (after build)
# - .next/static/chunks/ (with .js files)
```

### Test Locally in Production Mode

```bash
npm run build
npm run start:production
# Visit http://localhost:3000
# Check if chunks load correctly
```

### Contact Hostinger Support

If still not working, contact Hostinger with:
- Error messages from browser console
- Server logs
- Your Node.js configuration settings
- Output of: `ls -la .next/static/chunks/ | head -10`

## Prevention

After each deployment:
1. ✅ Always run `npm run build` on the server
2. ✅ Verify `.next/static/chunks/` exists with files
3. ✅ Restart the Node.js application
4. ✅ Test the website in browser

## Notes

- The `.next` folder is in `.gitignore` (correctly) - it should NOT be in Git
- Each server environment needs its own build
- Builds are environment-specific (production vs development)
- Chunk filenames change with each build (content-based hashing)

