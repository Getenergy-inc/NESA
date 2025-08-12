// Professional Email Templates for Judge Application Workflow

export interface EmailTemplateData {
  name: string;
  email: string;
  verificationUrl?: string;
  signupUrl?: string;
  applicationId?: string;
}

// Verification Email Template
export const judgeVerificationEmailTemplate = (data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} => ({
  subject: 'Verify Your Judge Application - NESA Awards 2025',
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Judge Application</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .logo { width: 120px; height: auto; margin-bottom: 10px; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>NESA Awards 2025</h1>
                <h2>Judge Application Verification</h2>
            </div>
            
            <div class="content">
                <h3>Dear ${data.name},</h3>
                
                <p>Thank you for your interest in becoming a judge for the prestigious New Education Standard Awards 2025!</p>
                
                <p>We have received your judge application and need to verify your email address to proceed with the review process.</p>
                
                <div class="highlight">
                    <strong>Next Step:</strong> Please click the verification button below to confirm your email address and complete your application submission.
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.verificationUrl}" class="button">Verify My Email Address</a>
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>Click the verification link above</li>
                    <li>Your application will be reviewed by our team</li>
                    <li>You'll receive an approval notification within 2-3 business days</li>
                    <li>Once approved, you'll be invited to create your judge account</li>
                </ul>
                
                <p><strong>Important:</strong> This verification link will expire in 24 hours for security purposes.</p>
                
                <p>If you did not apply to become a judge, please ignore this email.</p>
                
                <p>Best regards,<br>
                <strong>NESA Awards Team</strong><br>
                New Education Standard Awards Africa</p>
            </div>
            
            <div class="footer">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    📍 54, Fajolu Street, Surulere, Lagos<br>
                    📞 +234-907-962-1110 | +234-810-926-5897<br>
                    ✉️ nesa.africa@gmail.com
                </p>
            </div>
        </div>
    </body>
    </html>
  `,
  text: `
    Dear ${data.name},

    Thank you for your interest in becoming a judge for the New Education Standard Awards 2025!

    We have received your judge application and need to verify your email address to proceed with the review process.

    Please verify your email by visiting this link:
    ${data.verificationUrl}

    What happens next:
    1. Click the verification link above
    2. Your application will be reviewed by our team
    3. You'll receive an approval notification within 2-3 business days
    4. Once approved, you'll be invited to create your judge account

    Important: This verification link will expire in 24 hours for security purposes.

    If you did not apply to become a judge, please ignore this email.

    Best regards,
    NESA Awards Team
    New Education Standard Awards Africa

    Contact: nesa.africa@gmail.com | +234-907-962-1110
  `
});

// Approval Email Template
export const judgeApprovalEmailTemplate = (data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} => ({
  subject: 'Congratulations! Your Judge Application has been Approved - NESA Awards 2025 🎉',
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Judge Application Approved</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 25px 0; font-size: 16px; }
            .celebration { font-size: 48px; margin: 20px 0; }
            .highlight { background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #10b981; }
            .badge { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="celebration">🎉</div>
                <h1>Congratulations!</h1>
                <h2>You've Been Approved as a Judge</h2>
            </div>
            
            <div class="content">
                <h3>Dear ${data.name},</h3>
                
                <p><strong>Congratulations!</strong> We are pleased to inform you that your application to become a judge for the prestigious <strong>New Education Standard Awards 2025</strong> has been approved.</p>
                
                <div class="highlight">
                    <p><strong>🏆 Welcome to the NESA Awards 2025 Judging Panel!</strong></p>
                    <p>Your expertise and dedication to advancing educational excellence make you an invaluable addition to our panel of judges.</p>
                </div>
                
                <p>As a judge, you will play a key role in recognizing and celebrating outstanding contributions to education across Africa, in order to promote inclusive and equitable quality education for all.</p>
                
                <div class="badge">🎯 Next Step: Create Your Judge Account</div>
                
                <p>To confirm your participation and receive further details about your role, please click the button below to create your judge account:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.signupUrl}" class="button">Confirm Your Role as a Judge</a>
                </div>
                
                <p><strong>What you'll receive after account creation:</strong></p>
                <ul>
                    <li>Access to the judge portal and evaluation materials</li>
                    <li>Detailed judging guidelines and criteria</li>
                    <li>Schedule of judging activities and deadlines</li>
                    <li>Direct communication channel with the NESA team</li>
                    <li>Official judge credentials and recognition</li>
                </ul>
                
                <p>We are excited to collaborate with you and look forward to your insights in shaping this landmark event.</p>
                
                <p>Should you have any questions, feel free to reach out to us at any time.</p>
                
                <p>Once again, congratulations and welcome to the NESA Awards 2025 family!</p>
                
                <p>Best regards,<br>
                <strong>The NESA Awards Team</strong><br>
                New Education Standard Awards Africa</p>
            </div>
            
            <div class="footer">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    📍 54, Fajolu Street, Surulere, Lagos<br>
                    📞 +234-907-962-1110 | +234-810-926-5897<br>
                    ✉️ nesa.africa@gmail.com<br><br>
                    <em>Celebrating Excellence in African Education</em>
                </p>
            </div>
        </div>
    </body>
    </html>
  `,
  text: `
    Congratulations ${data.name}!

    We are pleased to inform you that your application to become a judge for the prestigious New Education Standard Awards 2025 has been approved.

    Your expertise and dedication to advancing educational excellence make you an invaluable addition to our panel of judges.

    As a judge, you will play a key role in recognizing and celebrating outstanding contributions to education across Africa, in order to promote inclusive and equitable quality education for all.

    NEXT STEP: Create Your Judge Account
    Please visit this link to confirm your participation and create your judge account:
    ${data.signupUrl}

    What you'll receive after account creation:
    - Access to the judge portal and evaluation materials
    - Detailed judging guidelines and criteria
    - Schedule of judging activities and deadlines
    - Direct communication channel with the NESA team
    - Official judge credentials and recognition

    We are excited to collaborate with you and look forward to your insights in shaping this landmark event.

    Should you have any questions, feel free to reach out to us at any time.

    Once again, congratulations and welcome to the NESA Awards 2025 family!

    Best regards,
    The NESA Awards Team
    New Education Standard Awards Africa

    Contact: nesa.africa@gmail.com | +234-907-962-1110
    Address: 54, Fajolu Street, Surulere, Lagos
  `
});

// Welcome Email Template (after account creation)
export const judgeWelcomeEmailTemplate = (data: EmailTemplateData): {
  subject: string;
  html: string;
  text: string;
} => ({
  subject: 'Welcome to NESA Awards 2025 - Your Judge Account is Ready!',
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Judge</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white; padding: 15px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 25px 0; }
            .welcome-badge { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; padding: 10px 20px; border-radius: 25px; font-weight: bold; display: inline-block; margin: 15px 0; }
            .info-box { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Welcome to NESA Awards 2025!</h1>
                <div class="welcome-badge">Official Judge</div>
            </div>
            
            <div class="content">
                <h3>Dear Judge ${data.name},</h3>
                
                <p>Welcome to the NESA Awards 2025 judging panel! Your judge account has been successfully created and you're now ready to begin your important role in recognizing educational excellence across Africa.</p>
                
                <div class="info-box">
                    <h4>🎯 Your Judge Dashboard is Ready</h4>
                    <p>Access your personalized judge portal to view assignments, evaluation criteria, and important updates.</p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${data.signupUrl}" class="button">Access Judge Dashboard</a>
                </div>
                
                <p><strong>What's Next:</strong></p>
                <ul>
                    <li><strong>Orientation:</strong> Review the judging guidelines and criteria</li>
                    <li><strong>Assignments:</strong> Check your evaluation assignments</li>
                    <li><strong>Timeline:</strong> Note important dates and deadlines</li>
                    <li><strong>Support:</strong> Contact us for any questions or assistance</li>
                </ul>
                
                <p><strong>Important Resources:</strong></p>
                <ul>
                    <li>Judge Handbook (available in your dashboard)</li>
                    <li>Evaluation Criteria and Rubrics</li>
                    <li>Technical Support and FAQs</li>
                    <li>Direct communication with NESA team</li>
                </ul>
                
                <p>Thank you for your commitment to advancing educational excellence in Africa. Your expertise and dedication will help us identify and celebrate the most impactful contributions to education across the continent.</p>
                
                <p>We're excited to work with you!</p>
                
                <p>Best regards,<br>
                <strong>The NESA Awards Team</strong><br>
                New Education Standard Awards Africa</p>
            </div>
            
            <div class="footer">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    📍 54, Fajolu Street, Surulere, Lagos<br>
                    📞 +234-907-962-1110 | +234-810-926-5897<br>
                    ✉️ nesa.africa@gmail.com<br><br>
                    <em>Celebrating Excellence in African Education</em>
                </p>
            </div>
        </div>
    </body>
    </html>
  `,
  text: `
    Welcome to NESA Awards 2025, Judge ${data.name}!

    Your judge account has been successfully created and you're now ready to begin your important role in recognizing educational excellence across Africa.

    Your Judge Dashboard is Ready
    Access your personalized judge portal to view assignments, evaluation criteria, and important updates.

    Dashboard URL: ${data.signupUrl}

    What's Next:
    1. Orientation: Review the judging guidelines and criteria
    2. Assignments: Check your evaluation assignments
    3. Timeline: Note important dates and deadlines
    4. Support: Contact us for any questions or assistance

    Important Resources:
    - Judge Handbook (available in your dashboard)
    - Evaluation Criteria and Rubrics
    - Technical Support and FAQs
    - Direct communication with NESA team

    Thank you for your commitment to advancing educational excellence in Africa. Your expertise and dedication will help us identify and celebrate the most impactful contributions to education across the continent.

    We're excited to work with you!

    Best regards,
    The NESA Awards Team
    New Education Standard Awards Africa

    Contact: nesa.africa@gmail.com | +234-907-962-1110
    Address: 54, Fajolu Street, Surulere, Lagos
  `
});

// Email service integration helper
export const sendEmail = async (
  to: string,
  template: { subject: string; html: string; text: string }
) => {
  // This is where you'd integrate with your email service
  // Examples for different services:
  
  // SendGrid
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({ to, from: 'nesa.africa@gmail.com', ...template });
  
  // AWS SES
  // const AWS = require('aws-sdk');
  // const ses = new AWS.SES({ region: 'us-east-1' });
  // await ses.sendEmail({ ... }).promise();
  
  // Nodemailer
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransporter({ ... });
  // await transporter.sendMail({ to, from: 'nesa.africa@gmail.com', ...template });
  
  // For development, log to console
  console.log(`📧 EMAIL SENT TO: ${to}`);
  console.log(`📋 SUBJECT: ${template.subject}`);
  console.log(`📄 CONTENT: ${template.text.substring(0, 200)}...`);
  
  return true;
};
