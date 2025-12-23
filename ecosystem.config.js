/**
 * PM2 Ecosystem Configuration for Hostinger
 * This file helps manage the Next.js application process on Hostinger
 * 
 * For standalone mode (recommended): Use the standalone server
 * For regular mode: Use the custom server.js or next start
 */
const path = require('path')
const fs = require('fs')

// Check if standalone build exists
const standaloneServerPath = path.join(__dirname, '.next', 'standalone', 'server.js')
const useStandalone = fs.existsSync(standaloneServerPath) && process.env.NODE_ENV === 'production'

module.exports = {
  apps: [
    {
      name: 'port24-technologies',
      // Use standalone server if available, otherwise use custom server or next start
      script: useStandalone 
        ? '.next/standalone/server.js'
        : 'server.js',
      instances: 1,
      exec_mode: 'fork',
      cwd: useStandalone ? path.join(__dirname, '.next', 'standalone') : __dirname,
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        HOSTNAME: process.env.HOSTNAME || '0.0.0.0',
        // SendGrid configuration
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL || 'sales@port24.tech',
        CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'sales@port24.tech',
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
      // Ensure proper environment
      node_args: '--max-old-space-size=1024',
    },
  ],
}

