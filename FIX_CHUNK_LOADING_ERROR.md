# Fix for Chunk Loading Error (400 Bad Request)

## Problem
The website shows "Application error: a client-side exception has occurred" and console shows:
- `GET https://port24.tech/_next/static/chunks/XXX.js net::ERR_ABORTED 400 (Bad Request)`
- `MIME type ('text/html') is not executable`

This means the server is returning HTML error pages instead of JavaScript files for Next.js chunks.

## Root Cause
The `/_next/static/` paths are being blocked or mishandled by server configuration, causing requests to return error pages (HTML) instead of JavaScript files.

## Solution Steps

### Step 1: Verify Build on Server
SSH into your Hostinger server and ensure the build is complete:

```bash
cd ~/domains/port24.tech/public_html  # or your actual path
npm install
npm run build
```

**Critical:** Ensure the `.next` folder exists and contains:
- `.next/static/` directory with chunk files
- `.next/standalone/` directory (if using standalone mode)

### Step 2: Verify File Permissions
Ensure the `.next` folder is readable:

```bash
chmod -R 755 .next
```

### Step 3: Update .htaccess (Already Fixed)
The `.htaccess` file has been updated to allow `/_next/static/` paths. If you're using Apache, ensure this file is uploaded.

**If using pure Node.js (no Apache):** The `.htaccess` file won't be used, so skip this step.

### Step 4: Check Hostinger Node.js Configuration

In Hostinger hPanel → Node.js settings:

1. **Application Startup File:** Should be one of:
   - `node_modules/next/dist/bin/next` (recommended)
   - `server.js` (if using custom server)

2. **Application Startup Options:** Should be:
   - `start -p ${PORT:-3000}` (if using next directly)
   - Leave empty if using `server.js`

3. **Application Root:** Should point to your project root (where `package.json` is)

4. **Node.js Version:** Should be 18.x or higher

### Step 5: Restart the Application

In Hostinger hPanel:
1. Go to Node.js section
2. Stop the application
3. Start the application again

Or via SSH/PM2:
```bash
pm2 restart port24-technologies
# or
pm2 restart all
```

### Step 6: Clear Browser Cache
After deploying fixes:
1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Or clear browser cache completely

## Alternative: Disable Standalone Mode (If Issues Persist)

If the problem continues, you can temporarily disable standalone mode:

1. Edit `next.config.js`:
   ```javascript
   // Comment out or remove this line:
   // output: 'standalone',
   ```

2. Rebuild:
   ```bash
   npm run build
   ```

3. Restart the application

## Verification

After applying fixes, check:

1. **Browser Console:** Should show no chunk loading errors
2. **Network Tab:** Requests to `/_next/static/chunks/*.js` should return:
   - Status: 200 OK
   - Content-Type: `application/javascript` or `text/javascript`
   - Not HTML content

3. **Test URL directly:**
   ```
   https://port24.tech/_next/static/chunks/webpack-8db40c0f0ce1f953.js
   ```
   Should return JavaScript, not HTML.

## Common Issues

### Issue: .next folder not uploaded
**Solution:** The `.next` folder is in `.gitignore`, so it won't be in Git. You MUST build on the server:
```bash
npm run build
```

### Issue: Wrong working directory
**Solution:** Ensure Node.js app is running from the project root (where `package.json` is), not a subdirectory.

### Issue: Port conflicts
**Solution:** Check that the PORT environment variable matches what Hostinger expects.

### Issue: Node.js version mismatch
**Solution:** Ensure Node.js 18+ is selected in Hostinger settings and matches your local version.

## Still Having Issues?

1. **Check server logs:**
   ```bash
   pm2 logs port24-technologies
   # or check Hostinger error logs
   ```

2. **Verify static files exist:**
   ```bash
   ls -la .next/static/chunks/
   # Should show .js files
   ```

3. **Test locally in production mode:**
   ```bash
   npm run build
   npm run start:production
   # Visit http://localhost:3000
   # Check if chunks load correctly
   ```

4. **Contact Hostinger Support** with:
   - Error messages from browser console
   - Server logs
   - Your Node.js configuration settings

