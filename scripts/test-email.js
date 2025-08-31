// This script is used to test the email sending functionality
// It can be run with: node scripts/test-email.js

require('dotenv').config();
const nodemailer = require('nodemailer');

async function main() {
  console.log('Testing email configuration...');
  
  // Create a test account if no credentials are provided
  let testAccount;
  let transporter;
  
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('No email credentials found in .env file. Creating test account...');
    testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    console.log('Test account created:');
    console.log(`- User: ${testAccount.user}`);
    console.log(`- Pass: ${testAccount.pass}`);
  } else {
    console.log('Using email credentials from .env file');
    
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  
  // Test email content
  const testEmail = {
    from: process.env.EMAIL_FROM || '"NESA Test" <test@example.com>',
    to: process.env.TEST_EMAIL_RECIPIENT || 'test@example.com',
    subject: 'NESA Email System Test',
    text: 'This is a test email from the NESA-Africa 2025 email system.',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #ea580c;">NESA Email System Test</h1>
        <p>This is a test email from the NESA-Africa 2025 email system.</p>
        <p>If you're seeing this, the email configuration is working correctly!</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #666;">
          <p>This is an automated test email. Please do not reply.</p>
        </div>
      </div>
    `,
  };
  
  try {
    // Send the test email
    console.log('Sending test email...');
    const info = await transporter.sendMail(testEmail);
    
    console.log('Email sent successfully!');
    console.log(`- Message ID: ${info.messageId}`);
    
    // If using Ethereal, show the preview URL
    if (testAccount) {
      console.log(`- Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      console.log('You can view the test email at the preview URL above.');
    }
    
    console.log('\nEmail configuration is working correctly!');
  } catch (error) {
    console.error('Error sending email:', error);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check your email credentials in the .env file');
    console.log('2. Make sure your email provider allows SMTP access');
    console.log('3. If using Gmail, ensure you\'re using an App Password');
    console.log('4. Check if your email provider requires additional security settings');
  }
}

main().catch(console.error);