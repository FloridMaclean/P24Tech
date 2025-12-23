# Fix for Standalone Mode Chunk Loading Issues

## Problem
When using `output: 'standalone'` in Next.js, the static files are in a different location, and the server needs to be configured correctly.

## Understanding Standalone Mode

When you run `npm run build` with `output: 'standalone'`, Next.js creates:
- `.next/standalone/` - Minimal server files
- `.next/standalone/.next/static/` - Static files (chunks, etc.)
- `.next/standalone/server.js` - Standalone server

## Solution Options

### Option 1: Use Standalone Server (Recommended)

**In Hostinger hPanel Node.js settings:**

1. **Application Startup File:** 
   ```
   .next/standalone/server.js
   ```

2. **Application Startup Options:** 
   ```
   (leave empty)
   ```

3. **Application Root:** 
   ```
   /domains/port24.tech/public_html
   ```

4. **Working Directory:** 
   ```
   /domains/port24.tech/public_html
   ```

**After build, the standalone server will automatically serve static files from the correct location.**

### Option 2: Disable Standalone Mode (Simpler)

If standalone mode is causing issues, you can disable it:

1. Edit `next.config.js`:
   ```javascript
   // Comment out or remove:
   // output: 'standalone',
   ```

2. Rebuild on server:
   ```bash
   npm run build
   ```

3. Use regular `next start` or your custom `server.js`

**In Hostinger hPanel Node.js settings:**

1. **Application Startup File:** 
   ```
   node_modules/next/dist/bin/next
   ```

2. **Application Startup Options:** 
   ```
   start -p ${PORT:-3000}
   ```

### Option 3: Fix Custom Server for Standalone

If you want to keep using `server.js` with standalone mode, update it:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)

// For standalone mode, point to the standalone build
const dir = dev 
  ? __dirname 
  : path.join(__dirname, '.next', 'standalone', __dirname.replace(process.cwd(), ''))

const app = next({ 
  dev, 
  hostname, 
  port,
  dir: dev ? undefined : dir
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`> Directory: ${dir}`)
  })
})
```

## Quick Fix Steps

1. **SSH into server:**
   ```bash
   ssh your-username@your-server-ip
   cd ~/domains/port24.tech/public_html
   ```

2. **Run deployment script:**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Choose your approach:**
   - **Option A:** Update Hostinger settings to use `.next/standalone/server.js`
   - **Option B:** Disable standalone mode and use regular `next start`
   - **Option C:** Update `server.js` for standalone mode

4. **Restart application** in Hostinger hPanel

5. **Test:** Visit `https://port24.tech/_next/static/chunks/webpack-*.js` (should return JS, not 404)

## Verification

After applying the fix:

1. **Check chunk URL directly:**
   ```
   https://port24.tech/_next/static/chunks/webpack-8db40c0f0ce1f953.js
   ```
   Should return JavaScript code (not 404 or HTML)

2. **Check browser console:**
   - No chunk loading errors
   - All `/_next/static/chunks/*.js` requests return 200 OK

3. **Website loads correctly:**
   - No "Application error" message
   - All pages work

## Troubleshooting

### Issue: Still getting 404s

**Check 1:** Verify build completed
```bash
ls -la .next/static/chunks/ | head -10
# Should show .js files
```

**Check 2:** Verify standalone structure (if using standalone)
```bash
ls -la .next/standalone/.next/static/chunks/ | head -10
# Should show .js files
```

**Check 3:** Check Node.js app is running from correct directory
```bash
# In Hostinger, verify Application Root is correct
```

### Issue: Server can't find standalone server

If using standalone mode, make sure:
- Build completed successfully
- `.next/standalone/server.js` exists
- Application Root in Hostinger points to project root
- Startup file is `.next/standalone/server.js`

### Issue: Custom server not working with standalone

Either:
1. Use the standalone server (Option 1) - recommended
2. Disable standalone mode (Option 2) - simpler
3. Update server.js (Option 3) - more complex

## Recommendation

**For Hostinger, I recommend Option 2 (disable standalone mode)** because:
- Simpler configuration
- Easier to debug
- Works reliably with custom server.js
- No special path handling needed

Then use:
- **Startup File:** `node_modules/next/dist/bin/next`
- **Startup Options:** `start -p ${PORT:-3000}`

