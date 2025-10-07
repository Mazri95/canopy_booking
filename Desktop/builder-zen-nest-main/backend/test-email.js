import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const testEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself for testing
    subject: 'Test Email from Booking System',
    html: `
      <h2>🎉 Email Test Successful!</h2>
      <p>Your booking system email is working correctly.</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('❌ Email failed:', error.message);
  }
};

testEmail();

