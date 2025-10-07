# Email Setup Guide

To enable real email notifications for booking confirmations, follow these steps:

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update Environment Variables**:
   ```bash
   # In your backend/.env file, add:
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASS="your-16-character-app-password"
   ```

## Alternative Email Services

### SendGrid
```javascript
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey',
    pass: 'your-sendgrid-api-key'
  }
});
```

### Mailgun
```javascript
const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: 'your-mailgun-username',
    pass: 'your-mailgun-password'
  }
});
```

## Testing Email

Once configured, test with:
```bash
curl -X POST http://localhost:4000/bookings \
  -H 'Content-Type: application/json' \
  -d '{
    "canopyType": "Pyramid Canopy",
    "canvasType": "Standard Canvas", 
    "accessories": ["String Lighting"],
    "eventType": "wedding",
    "location": "123 Main St",
    "eventDate": "2024-12-25",
    "startTime": "18:00",
    "duration": "8",
    "guestCount": "100",
    "totalPrice": "50000",
    "userEmail": "your-email@example.com"
  }'
```

## Current Demo Mode

Currently running in demo mode - emails are logged to console instead of being sent.
To enable real emails, update the backend/src/index.js file and uncomment the real email sending code.



