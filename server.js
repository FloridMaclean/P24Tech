#!/usr/bin/env node

/**
 * Custom Server Script for Hostinger
 * This script ensures proper handling of Next.js static files
 * 
 * Usage: node server.js
 * Or set as startup file in Hostinger Node.js settings
 * 
 * For standalone mode: Use .next/standalone/server.js instead
 * Or run: node .next/standalone/server.js
 */

const path = require('path')
const fs = require('fs')

// Check if standalone build exists
const standaloneServerPath = path.join(process.cwd(), '.next', 'standalone', 'server.js')
const standaloneExists = fs.existsSync(standaloneServerPath)

if (standaloneExists && process.env.NODE_ENV === 'production') {
  console.log('✅ Using standalone server from .next/standalone/server.js')
  console.log('📝 To use standalone mode, run: node .next/standalone/server.js')
  console.log('📝 Or update your PM2/startup script to use the standalone server')
  console.log('')
  console.log('⚠️  Continuing with custom server for compatibility...')
  console.log('')
}

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ 
  dev, 
  hostname, 
  port
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      
      // Ensure proper MIME types for JavaScript files
      if (parsedUrl.pathname?.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      }
      
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
    if (standaloneExists) {
      console.log(`> Standalone build available at: .next/standalone/server.js`)
    }
  })
})

