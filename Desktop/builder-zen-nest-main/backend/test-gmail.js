import 'dotenv/config';
import nodemailer from 'nodemailer';

console.log('Testing Gmail configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' + process.env.EMAIL_PASS.slice(-4) : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function testEmail() {
  try {
    // Test connection
    await transporter.verify();
    console.log('✅ Gmail connection successful!');
    
    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self for testing
      subject: 'Test Email - CanopyBooking',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669;">Test Email</h2>
          <p>This is a test email to verify Gmail configuration.</p>
          <p>If you receive this, the email setup is working correctly!</p>
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The CanopyBooking Team
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent successfully!');
    
  } catch (error) {
    console.error('❌ Gmail test failed:', error.message);
    
    if (error.message.includes('Invalid login')) {
      console.log('\n🔧 Troubleshooting:');
      console.log('1. Make sure you have enabled 2-factor authentication on your Gmail account');
      console.log('2. Generate an App Password (not your regular password)');
      console.log('3. Use the App Password in EMAIL_PASS environment variable');
      console.log('4. App Password format: xxxx xxxx xxxx xxxx (16 characters with spaces)');
    }
  }
}

testEmail();
