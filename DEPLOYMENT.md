# Deployment Notes

## Environment Variables Required

For the contact form to work, you need to set the following environment variables on your production server:

1. **SENDGRID_API_KEY** (Required)
   - Your SendGrid API key (should start with `SG.`)
   - Get it from: https://app.sendgrid.com/settings/api_keys

2. **SENDGRID_FROM_EMAIL** (Optional)
   - Default: `sales@port24.tech`
   - Email address that will appear as the sender

3. **CONTACT_EMAIL** (Optional)
   - Default: `sales@port24.tech`
   - Email address where contact form submissions will be sent

## Setting Environment Variables

### On cPanel/Shared Hosting
1. Go to your cPanel
2. Navigate to "Environment Variables" or ".env" file
3. Add: `SENDGRID_API_KEY=SG.your_api_key_here`

### On VPS/Server
Add to your `.env` file or environment configuration:
```bash
SENDGRID_API_KEY=SG.your_api_key_here
SENDGRID_FROM_EMAIL=sales@port24.tech
CONTACT_EMAIL=sales@port24.tech
```

### With PM2 (if using ecosystem.config.js)
Add to the `env` section:
```javascript
env: {
  SENDGRID_API_KEY: 'SG.your_api_key_here',
  SENDGRID_FROM_EMAIL: 'sales@port24.tech',
  CONTACT_EMAIL: 'sales@port24.tech'
}
```

## Testing

After setting the environment variables, restart your server/application and test the contact form.

