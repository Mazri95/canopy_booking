#!/usr/bin/env node

console.log('📧 Email Setup for CanopyBooking');
console.log('=====================================');
console.log('');
console.log('To enable real email notifications, follow these steps:');
console.log('');
console.log('1. Go to your Google Account: https://myaccount.google.com/');
console.log('2. Security → 2-Step Verification (enable if not already)');
console.log('3. App passwords → Generate app password');
console.log('4. Select app: "Mail"');
console.log('5. Copy the 16-character password');
console.log('');
console.log('6. Add these environment variables to your backend/.env file:');
console.log('   EMAIL_USER="your-email@gmail.com"');
console.log('   EMAIL_PASS="your-16-character-app-password"');
console.log('');
console.log('7. Restart the backend server');
console.log('');
console.log('Example .env file:');
console.log('------------------');
console.log('EMAIL_USER="m.azrikhairuddin95@gmail.com"');
console.log('EMAIL_PASS="abcd efgh ijkl mnop"');
console.log('');
console.log('After setup, test with:');
console.log('curl -X POST http://localhost:4000/bookings \\');
console.log('  -H "Content-Type: application/json" \\');
console.log('  -d \'{"canopyType":"Pyramid Canopy","canvasType":"Standard Canvas","accessories":["String Lighting"],"eventType":"wedding","location":"123 Main St","eventDate":"2024-12-25","startTime":"18:00","duration":"8","guestCount":"100","totalPrice":"50000","userEmail":"m.azrikhairuddin95@gmail.com"}\'');



