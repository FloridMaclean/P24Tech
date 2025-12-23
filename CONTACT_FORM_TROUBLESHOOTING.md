# Contact Form 500 Error Troubleshooting Guide

## Problem
The contact form returns a 500 Internal Server Error in production but works locally.

## Common Causes

### 1. Missing SENDGRID_API_KEY Environment Variable (Most Common)

**Symptoms:**
- 500 error when submitting the contact form
- Console shows: `POST /api/contact 500 (Internal Server Error)`
- Works fine on local development

**Solution:**

1. **Check if the environment variable is set in production:**
   - Log in to your Hostinger hPanel
   - Navigate to **Node.js** section
   - Find **Environment Variables** or **.env** configuration
   - Verify that `SENDGRID_API_KEY` is set

2. **Set the environment variable:**
   ```
   SENDGRID_API_KEY=SG.your_actual_api_key_here
   ```
   - Replace `your_actual_api_key_here` with your actual SendGrid API key
   - The key should start with `SG.`
   - Make sure there are no extra spaces or quotes

3. **Restart your Node.js application:**
   - In hPanel, restart the Node.js application
   - Or if using PM2: `pm2 restart port24-technologies`

### 2. Invalid SendGrid API Key Format

**Symptoms:**
- API key is set but doesn't start with `SG.`
- Key might be truncated or incorrectly copied

**Solution:**
- Verify the API key starts with `SG.`
- Copy the entire key from SendGrid dashboard
- Make sure no characters are missing at the beginning or end

### 3. SendGrid API Key Permissions

**Symptoms:**
- 401 (Unauthorized) or 403 (Forbidden) errors in logs
- API key exists but SendGrid rejects requests

**Solution:**
1. Log in to SendGrid dashboard
2. Navigate to **Settings** > **API Keys**
3. Verify your API key has **Mail Send** permissions
4. If needed, create a new API key with full access

### 4. Environment Variables Not Loading

**Symptoms:**
- Environment variables are set in hPanel but not accessible to the app
- Different behavior between local and production

**Solution:**
1. **Verify environment variable format in hPanel:**
   - Use format: `KEY=value` (no spaces around `=`)
   - Don't use quotes unless the value contains spaces
   - Each variable on a new line

2. **Check if using .env file:**
   - If you have a `.env` file, make sure it's in the root directory
   - Verify it's not in `.gitignore` (it should be, but check it exists on server)
   - Restart the application after adding/updating `.env`

3. **Verify Node.js application can access env vars:**
   - SSH into your server
   - Run: `node -e "console.log(process.env.SENDGRID_API_KEY ? 'Set' : 'Not set')"`
   - If it shows "Not set", the environment variable isn't being loaded

## How to Verify the Fix

### Method 1: Check Server Logs
1. In Hostinger hPanel, navigate to **Node.js** > **Logs**
2. Look for error messages related to `SENDGRID_API_KEY`
3. Check for "SENDGRID_API_KEY is not configured" or similar errors

### Method 2: Test the API Endpoint Directly
Use curl or Postman to test:
```bash
curl -X POST https://port24.tech/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

Expected response if working:
```json
{"message": "Thank you! Your message has been sent successfully."}
```

### Method 3: Check Browser Console
1. Open browser developer tools (F12)
2. Go to Network tab
3. Submit the contact form
4. Check the response from `/api/contact`
5. Look at the error message in the response

## Quick Fix Checklist

- [ ] `SENDGRID_API_KEY` is set in Hostinger hPanel Node.js environment variables
- [ ] API key starts with `SG.`
- [ ] API key is complete (not truncated)
- [ ] SendGrid API key has Mail Send permissions
- [ ] Node.js application has been restarted after setting environment variables
- [ ] No extra spaces or quotes around the API key value
- [ ] Environment variable name is exactly `SENDGRID_API_KEY` (case-sensitive)

## Additional Environment Variables

Make sure these are also set in production:
```
SENDGRID_API_KEY=SG.your_api_key_here
CONTACT_EMAIL=sales@port24.tech
SENDGRID_FROM_EMAIL=sales@port24.tech
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.port24.tech
```

## Getting Your SendGrid API Key

1. Log in to [SendGrid Dashboard](https://app.sendgrid.com/)
2. Navigate to **Settings** > **API Keys**
3. Click **Create API Key**
4. Name it (e.g., "Port24 Production")
5. Select **Full Access** or **Restricted Access** with **Mail Send** permission
6. Click **Create & View**
7. Copy the API key immediately (you won't be able to see it again)
8. Paste it into your Hostinger environment variables

## Still Having Issues?

1. **Check application logs:**
   ```bash
   # Via SSH
   pm2 logs port24-technologies
   # Or check Hostinger logs in hPanel
   ```

2. **Verify SendGrid account status:**
   - Make sure your SendGrid account is active
   - Check if you've verified your sender email address
   - Verify you haven't exceeded SendGrid rate limits

3. **Test SendGrid API key directly:**
   ```bash
   curl -X POST https://api.sendgrid.com/v3/mail/send \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"personalizations":[{"to":[{"email":"test@example.com"}]}],"from":{"email":"sales@port24.tech"},"subject":"Test","content":[{"type":"text/plain","value":"Test"}]}'
   ```

4. **Contact Support:**
   - Check Hostinger support for environment variable configuration
   - Review SendGrid documentation: https://docs.sendgrid.com/

## Prevention

To prevent this issue in the future:
- Document all required environment variables
- Use a deployment checklist
- Test environment variables after each deployment
- Set up monitoring/alerts for API failures
- Keep a backup of your SendGrid API key in a secure password manager

