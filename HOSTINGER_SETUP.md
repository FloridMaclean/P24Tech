# Quick Hostinger Setup Guide

## Quick Start Checklist

### 1. Push to GitHub
- [ ] Commit all changes: `git add . && git commit -m "Ready for deployment"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Verify repository: https://github.com/FloridMaclean/P24Tech.git

### 2. Deploy from GitHub to Hostinger
- [ ] SSH into Hostinger server
- [ ] Navigate to domain directory: `cd ~/domains/yourdomain.com/public_html`
- [ ] Clone repository: `git clone https://github.com/FloridMaclean/P24Tech.git .`
- [ ] Or pull latest: `git pull origin main` (if already cloned)

### 3. Set Environment Variables in hPanel
Navigate to **Node.js** → **Environment Variables** and add:

```
NODE_ENV=production
PORT=3000
SENDGRID_API_KEY=your_actual_sendgrid_key
CONTACT_EMAIL=sales@port24.tech
SENDGRID_FROM_EMAIL=sales@port24.tech
NEXT_PUBLIC_SITE_URL=https://www.port24.tech
```

### 4. Install & Build
In hPanel **Node.js** section:
- [ ] Click **Install Dependencies** (`npm install`)
- [ ] Click **Build Application** (`npm run build`)

### 5. Configure Node.js App
In hPanel **Node.js** settings:
- **Application Root**: `/domains/yourdomain.com/public_html`
- **Application URL**: `yourdomain.com` or `www.yourdomain.com`
- **Startup File**: `node_modules/next/dist/bin/next`
- **Startup Options**: `start -p ${PORT:-3000}`
- **Node.js Version**: 18.x or higher

### 6. Start Application
- [ ] Click **Start** in Node.js manager
- [ ] Verify application is running

### 7. SSL Certificate
- [ ] Install SSL certificate in hPanel
- [ ] Enable HTTPS redirect

### 8. Test
- [ ] Visit: `https://www.port24.tech`
- [ ] Test contact form
- [ ] Check all pages load correctly

## Troubleshooting Quick Fixes

**App won't start?**
- Check Node.js version (needs 18+)
- Verify PORT environment variable
- Check logs in hPanel

**Build fails?**
- Clear `.next` folder
- Run `npm install` again
- Check Node.js version compatibility

**404 errors?**
- Verify `.htaccess` is uploaded
- Check Next.js routing configuration
- Ensure static files in `/public` are accessible

**Contact form not working?**
- Verify `SENDGRID_API_KEY` is set correctly
- Check SendGrid API key permissions
- Review application logs

## File Structure for Hostinger

```
public_html/
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions
├── public/                 # Static assets
├── .env                    # Environment variables (set in hPanel)
├── .htaccess              # Apache configuration
├── ecosystem.config.js     # PM2 configuration (optional)
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
├── server.js              # Custom server (optional)
└── tsconfig.json          # TypeScript configuration
```

## Important Notes

- **GitHub Repository**: https://github.com/FloridMaclean/P24Tech.git
- **Port**: Hostinger will assign a port (usually 3000). Use `${PORT}` in your config.
- **Node.js Version**: Must be 18.x or higher (specified in `.nvmrc`)
- **Build Output**: Uses Next.js standalone mode for optimized deployment
- **Environment Variables**: Set in hPanel, not in `.env` file on server
- **Git Updates**: After pushing to GitHub, SSH into Hostinger and run `git pull origin main` then rebuild

## Support Resources

- Full deployment guide: See `DEPLOYMENT.md`
- Hostinger Support: https://www.hostinger.com/contact
- Next.js Docs: https://nextjs.org/docs

