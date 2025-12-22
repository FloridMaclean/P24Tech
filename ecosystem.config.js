/**
 * PM2 Ecosystem Configuration for Hostinger
 * This file helps manage the Next.js application process on Hostinger
 */
module.exports = {
  apps: [
    {
      name: 'port24-technologies',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p ${PORT:-3000}',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', '.next', 'logs'],
    },
  ],
}

