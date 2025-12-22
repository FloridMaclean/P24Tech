# GitHub to Hostinger Deployment Guide

This guide walks you through deploying your code from GitHub to Hostinger.

## 📦 Repository Information

- **GitHub Repository:** https://github.com/FloridMaclean/P24Tech.git
- **Default Branch:** `main`

## 🚀 Initial Setup

### Step 1: Initialize Git (if not already done)

```bash
# Navigate to your project directory
cd "/Users/floridmclean/Downloads/Cursor-P24 Tech"

# Initialize git repository (if not already initialized)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/FloridMaclean/P24Tech.git

# Or if remote already exists, update it
git remote set-url origin https://github.com/FloridMaclean/P24Tech.git
```

### Step 2: Commit and Push to GitHub

```bash
# Check current status
git status

# Add all files (respects .gitignore)
git add .

# Commit changes
git commit -m "Production-ready build for Hostinger deployment"

# Push to GitHub
git push -u origin main
```

**Note:** If you get an error about the branch not existing, use:
```bash
git push -u origin main --force
```

## 🔄 Deployment Workflow

### On Hostinger Server (First Time Setup)

1. **SSH into your Hostinger server:**
   ```bash
   ssh your-username@your-server-ip
   ```

2. **Navigate to your domain directory:**
   ```bash
   cd ~/domains/yourdomain.com/public_html
   ```

3. **Clone the repository:**
   ```bash
   # Remove any existing files (backup first if needed)
   git clone https://github.com/FloridMaclean/P24Tech.git .
   ```

4. **Install dependencies:**
   ```bash
   npm install --production
   ```

5. **Build the application:**
   ```bash
   npm run build
   ```

6. **Configure in Hostinger hPanel:**
   - Go to **Node.js** section
   - Set up your Node.js application
   - Configure environment variables
   - Start the application

### Updating Deployment (After Code Changes)

1. **On your local machine:**
   ```bash
   # Make your changes
   # ... edit files ...

   # Commit changes
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

2. **On Hostinger server (SSH):**
   ```bash
   # SSH into server
   ssh your-username@your-server-ip

   # Navigate to project directory
   cd ~/domains/yourdomain.com/public_html

   # Pull latest changes
   git pull origin main

   # Reinstall dependencies (if package.json changed)
   npm install --production

   # Rebuild application
   npm run build

   # Restart Node.js application (via hPanel or PM2)
   # If using PM2:
   pm2 restart port24-technologies
   ```

## 🔐 GitHub Authentication

### Option 1: HTTPS (Recommended for Hostinger)

If you're using HTTPS, you may need to use a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as password when prompted:
   ```bash
   git clone https://github.com/FloridMaclean/P24Tech.git
   # Username: your-github-username
   # Password: your-personal-access-token
   ```

### Option 2: SSH Keys (If Hostinger supports it)

1. Generate SSH key on Hostinger server:
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```

2. Add public key to GitHub:
   - Copy `~/.ssh/id_ed25519.pub`
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key

3. Clone using SSH:
   ```bash
   git clone git@github.com:FloridMaclean/P24Tech.git
   ```

## 📋 Quick Reference Commands

### Local Development
```bash
# Check git status
git status

# View recent commits
git log --oneline -10

# Check remote repository
git remote -v

# Pull latest changes
git pull origin main
```

### Hostinger Server
```bash
# Navigate to project
cd ~/domains/yourdomain.com/public_html

# Pull latest code
git pull origin main

# Install dependencies
npm install --production

# Build application
npm run build

# Check Node.js version
node --version

# View application logs (if using PM2)
pm2 logs port24-technologies
```

## 🛠️ Troubleshooting

### Git Pull Fails on Hostinger

**Problem:** Local changes conflict with remote changes

**Solution:**
```bash
# Stash local changes
git stash

# Pull latest
git pull origin main

# Apply stashed changes (if needed)
git stash pop
```

### Build Fails After Git Pull

**Problem:** Dependencies or configuration changed

**Solution:**
```bash
# Clean install
rm -rf node_modules .next
npm install --production
npm run build
```

### Permission Denied on Git Operations

**Problem:** File permissions issue

**Solution:**
```bash
# Fix ownership (adjust username as needed)
sudo chown -R your-username:your-username ~/domains/yourdomain.com/public_html

# Fix permissions
chmod -R 755 ~/domains/yourdomain.com/public_html
```

## 🔄 Automated Deployment (Optional)

If Hostinger supports webhooks or CI/CD:

1. Set up a webhook in GitHub to trigger deployment
2. Or use GitHub Actions (if Hostinger supports it)
3. Or set up a cron job on Hostinger to auto-pull:
   ```bash
   # Add to crontab (runs every hour)
   0 * * * * cd ~/domains/yourdomain.com/public_html && git pull origin main && npm run build
   ```

## 📝 Best Practices

1. **Always test locally before pushing:**
   ```bash
   npm run build
   npm run start:production
   ```

2. **Use meaningful commit messages:**
   ```bash
   git commit -m "Fix contact form validation"
   git commit -m "Update deployment configuration"
   ```

3. **Keep `.env` files out of Git:**
   - Already configured in `.gitignore`
   - Use `env.example` as template

4. **Tag releases for important deployments:**
   ```bash
   git tag -a v1.0.0 -m "Production release"
   git push origin v1.0.0
   ```

## 🔗 Useful Links

- **GitHub Repository:** https://github.com/FloridMaclean/P24Tech.git
- **Hostinger Support:** https://www.hostinger.com/contact
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Git Documentation:** https://git-scm.com/doc

---

**Last Updated:** 2024
**Repository:** https://github.com/FloridMaclean/P24Tech.git

