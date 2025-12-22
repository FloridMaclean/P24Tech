# PORT24 Technologies - Website

Official website for PORT24 Technologies - Premier IT Consulting & Software Development company based in London, ON, Canada.

## 🚀 Tech Stack

- **Framework:** Next.js 14.2.0 (React 18.2.0)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Email Service:** SendGrid
- **Deployment:** Hostinger Node.js Hosting

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git (for version control)

## 🛠️ Local Development

### Installation

```bash
# Clone the repository
git clone https://github.com/FloridMaclean/P24Tech.git

# Navigate to project directory
cd P24Tech

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# SendGrid Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
CONTACT_EMAIL=sales@port24.tech
SENDGRID_FROM_EMAIL=sales@port24.tech

# Node Environment
NODE_ENV=development

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server locally
npm run start:production
```

## 📦 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API
│   ├── privacy/           # Privacy policy page
│   ├── rss/               # RSS feed
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── sitemap.ts         # Sitemap generator
├── components/            # React components
│   ├── About.tsx
│   ├── ContactForm.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Services.tsx
│   ├── Stats.tsx
│   ├── StructuredData.tsx
│   └── Testimonials.tsx
├── lib/                   # Utility functions
│   └── seo.ts             # SEO configuration
├── public/                # Static assets
│   ├── icon/              # Favicons and icons
│   ├── browserconfig.xml
│   ├── manifest.json
│   └── robots.txt
├── ecosystem.config.js    # PM2 configuration
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## 🌐 Deployment

This application is configured for deployment on **Hostinger Node.js Hosting**.

### Quick Deployment Guide

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **On Hostinger:**
   - SSH into your server
   - Navigate to your domain directory
   - Pull latest changes: `git pull origin main`
   - Install dependencies: `npm install --production`
   - Build: `npm run build`
   - Restart Node.js application

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md) or [HOSTINGER_SETUP.md](./HOSTINGER_SETUP.md).

## 📝 Environment Variables for Production

Set these in Hostinger hPanel (Node.js → Environment Variables):

```
NODE_ENV=production
PORT=3000
SENDGRID_API_KEY=your_sendgrid_api_key
CONTACT_EMAIL=sales@port24.tech
SENDGRID_FROM_EMAIL=sales@port24.tech
NEXT_PUBLIC_SITE_URL=https://www.port24.tech
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run build:production` - Build with production environment
- `npm run start:production` - Start with production environment

## 📄 License

Private - PORT24 Technologies

## 📞 Contact

- **Website:** https://www.port24.tech
- **Email:** sales@port24.tech
- **Location:** London, ON, Canada

## 🔗 Repository

GitHub: https://github.com/FloridMaclean/P24Tech.git

---

Built with ❤️ by PORT24 Technologies
