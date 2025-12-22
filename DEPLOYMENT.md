# Hostinger Deployment Guide

This guide will help you deploy the PORT24 Technologies website to Hostinger's Node.js hosting.

## Prerequisites

- Hostinger Business Web Hosting plan with Node.js support
- Access to Hostinger Control Panel (hPanel)
- Node.js version 18.x or higher
- Git (optional, for version control)

## Pre-Deployment Checklist

1. ✅ Build the application locally to ensure no errors
2. ✅ Set up environment variables
3. ✅ Test the application locally in production mode
4. ✅ Ensure all dependencies are listed in `package.json`

## Step 1: Prepare Your Application

### Build Locally (Optional but Recommended)

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Test production build locally
npm run start:production
```

## Step 2: Upload Files to Hostinger

### Option A: Using File Manager (hPanel)

1. Log in to your Hostinger hPanel
2. Navigate to **File Manager**
3. Go to your domain's root directory (usually `public_html` or `domains/yourdomain.com/public_html`)
4. Upload all project files **except**:
   - `node_modules/` (will be installed on server)
   - `.next/` (will be built on server)
   - `.env` files (set via hPanel)
   - `.git/` (if using Git)

### Option B: Using FTP/SFTP

1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your Hostinger server
3. Upload files to the appropriate directory

### Option C: Using Git/GitHub (Recommended)

**Repository:** https://github.com/FloridMaclean/P24Tech.git

#### Method 1: SSH into Hostinger and Clone

If you have SSH access to your Hostinger server:

```bash
# SSH into your Hostinger server
ssh your-username@your-server-ip

# Navigate to your domain directory
cd ~/domains/yourdomain.com/public_html

# Clone your GitHub repository
git clone https://github.com/FloridMaclean/P24Tech.git .

# Or if you've already cloned, pull latest changes
git pull origin main

# Install dependencies
npm install --production

# Build the application
npm run build
```

#### Method 2: Using Hostinger Git Integration (if available)

1. In Hostinger hPanel, navigate to **Git** or **Version Control** section
2. Connect your GitHub repository:
   - Repository URL: `https://github.com/FloridMaclean/P24Tech.git`
   - Branch: `main`
   - Deploy path: `/domains/yourdomain.com/public_html`
3. Configure auto-deploy (if available) or manually trigger deployment
4. After deployment, run build commands via SSH or hPanel Node.js manager

#### Method 3: Manual Git Setup on Hostinger

```bash
# SSH into Hostinger
ssh your-username@your-server-ip

# Navigate to your domain directory
cd ~/domains/yourdomain.com/public_html

# Initialize git if not already done
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/FloridMaclean/P24Tech.git

# Pull the latest code
git pull origin main

# Install and build
npm install --production
npm run build
```

## Step 3: Configure Environment Variables

1. In Hostinger hPanel, navigate to **Node.js** section
2. Find **Environment Variables** or **.env** configuration
3. Add the following variables:

```
NODE_ENV=production
PORT=3000
SENDGRID_API_KEY=your_sendgrid_api_key_here
CONTACT_EMAIL=sales@port24.tech
SENDGRID_FROM_EMAIL=sales@port24.tech
NEXT_PUBLIC_SITE_URL=https://www.port24.tech
```

**Important:** Replace placeholder values with your actual credentials.

## Step 4: Install Dependencies and Build

### Via hPanel Node.js Manager:

1. Navigate to **Node.js** in hPanel
2. Select your application directory
3. Click **Install Dependencies** (runs `npm install`)
4. Click **Build Application** (runs `npm run build`)

### Via SSH/Terminal:

```bash
# Navigate to your application directory
cd ~/domains/yourdomain.com/public_html

# Install dependencies
npm install --production

# Build the application
npm run build
```

## Step 5: Configure Node.js Application

1. In hPanel, go to **Node.js** section
2. Create a new Node.js application:
   - **Application Root**: `/domains/yourdomain.com/public_html`
   - **Application URL**: `yourdomain.com` or `www.yourdomain.com`
   - **Application Startup File**: `node_modules/next/dist/bin/next`
   - **Application Startup Options**: `start -p ${PORT:-3000}`
   - **Node.js Version**: 18.x or higher

### Alternative: Using PM2 (if available)

If Hostinger supports PM2:

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Start the application using PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup
```

## Step 6: Configure Port and Domain

1. In hPanel Node.js settings, ensure the port is set correctly (usually 3000 or as assigned by Hostinger)
2. Configure your domain to point to the Node.js application
3. If using a subdomain, ensure DNS is properly configured

## Step 7: SSL Certificate (HTTPS)

1. In hPanel, navigate to **SSL** section
2. Install a free SSL certificate (Let's Encrypt) or your own certificate
3. Ensure HTTPS is enabled and HTTP redirects to HTTPS

## Step 8: Test Your Deployment

1. Visit your domain: `https://www.port24.tech`
2. Test all pages and functionality:
   - Homepage
   - Contact form
   - Privacy page
   - API endpoints

## Troubleshooting

### Application Not Starting

1. **Check Node.js version**: Ensure Node.js 18+ is selected in hPanel
2. **Check logs**: View application logs in hPanel or via SSH:
   ```bash
   # If using PM2
   pm2 logs port24-technologies
   
   # Or check Hostinger logs
   tail -f ~/logs/error.log
   ```
3. **Verify environment variables**: Ensure all required env vars are set
4. **Check port**: Verify the port in Node.js settings matches your application

### Build Errors

1. **Clear cache and rebuild**:
   ```bash
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Check Node.js version compatibility**:
   ```bash
   node --version  # Should be 18.x or higher
   ```

### 404 Errors

1. Ensure `.htaccess` is in the root directory
2. Verify Next.js routing is working correctly
3. Check that static files are being served from `/public` directory

### Contact Form Not Working

1. Verify `SENDGRID_API_KEY` is set correctly
2. Check SendGrid API key permissions
3. Review application logs for SendGrid errors
4. Test API endpoint: `https://www.port24.tech/api/contact`

### Performance Issues

1. Enable caching in hPanel
2. Use CDN for static assets (if available)
3. Monitor server resources in hPanel
4. Consider upgrading hosting plan if needed

## Maintenance

### Updating the Application

1. Upload new files (or pull from Git)
2. Install dependencies: `npm install`
3. Rebuild: `npm run build`
4. Restart the application in hPanel or via PM2: `pm2 restart port24-technologies`

### Monitoring

- Check application logs regularly
- Monitor server resources (CPU, Memory, Disk)
- Set up uptime monitoring
- Monitor error rates

## Support

For Hostinger-specific issues:
- Hostinger Support: https://www.hostinger.com/contact
- Hostinger Knowledge Base: https://support.hostinger.com/

For application-specific issues:
- Check application logs
- Review Next.js documentation: https://nextjs.org/docs

## Security Checklist

- ✅ Environment variables are set securely (not in code)
- ✅ SSL certificate is installed and active
- ✅ Security headers are configured (in `next.config.js`)
- ✅ API keys are kept secret
- ✅ Regular backups are configured
- ✅ Dependencies are up to date

## Additional Notes

- The application uses Next.js standalone output mode for optimized deployment
- Static assets are served from the `/public` directory
- API routes are located in `/app/api/`
- The application is configured for production with security headers and optimizations

---

**Last Updated**: 2024
**Next.js Version**: 14.2.0
**Node.js Version**: 18.x+

