import { sendEmail } from './nodemailer';

interface VerificationEmailParams {
  email: string;
  name: string;
  organization: string;
  token: string;
  endorsementId: string;
}

export async function sendVerificationEmail({
  email,
  name,
  organization,
  token,
  endorsementId
}: VerificationEmailParams): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nesa.africa';
  const verificationUrl = `${baseUrl}/get-involved/endorse-nesa-africa/verify?email=${encodeURIComponent(email)}&token=${token}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your NESA-Africa 2025 Endorsement</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #ea580c;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header img {
          max-width: 200px;
        }
        .content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
        .button {
          display: inline-block;
          background-color: #ea580c;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .info-box {
          background-color: #f3f4f6;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
        }
        .highlight {
          font-weight: bold;
          color: #ea580c;
        }
        .divider {
          border-top: 1px solid #e5e7eb;
          margin: 25px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${baseUrl}/images/nesa-logo-white.png" alt="NESA-Africa Logo">
        </div>
        <div class="content">
          <h1>Verify Your Email Address</h1>
          
          <p>Dear <span class="highlight">${name}</span>,</p>
          
          <p>Thank you for endorsing NESA-Africa 2025 on behalf of <span class="highlight">${organization}</span>! We're excited to have your support for this transformative educational initiative across Africa.</p>
          
          <p><strong>Please verify your email address to complete your endorsement submission.</strong></p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Verify My Email</a>
          </div>
          
          <div class="info-box">
            <p><strong>Endorsement Details:</strong></p>
            <p>Organization: ${organization}</p>
            <p>Endorsement ID: ${endorsementId}</p>
            <p>Status: Pending Verification</p>
          </div>
          
          <p>After verification, your endorsement will be reviewed by our team within 24-72 hours. Once approved, it will be displayed on our Wall of Endorsers.</p>
          
          <p>If you did not submit this endorsement, please ignore this email or contact us at <a href="mailto:endorse@nesa.africa">endorse@nesa.africa</a>.</p>
          
          <div class="divider"></div>
          
          <p>Thank you for supporting quality education across Africa!</p>
          
          <p>Best regards,<br>
          The NESA-Africa 2025 Team</p>
        </div>
        <div class="footer">
          <p>© 2024 NESA-Africa. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
          <p>
            <a href="${baseUrl}">Website</a> | 
            <a href="${baseUrl}/get-involved">Get Involved</a> | 
            <a href="${baseUrl}/contact">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Verify Your NESA-Africa 2025 Endorsement
    
    Dear ${name},
    
    Thank you for endorsing NESA-Africa 2025 on behalf of ${organization}!
    
    Please verify your email address by clicking the link below:
    
    ${verificationUrl}
    
    This verification is required to proceed with the review of your endorsement.
    
    Endorsement Details:
    - Organization: ${organization}
    - Endorsement ID: ${endorsementId}
    - Status: Pending Verification
    
    After verification, your endorsement will be reviewed by our team within 24-72 hours. Once approved, it will be displayed on our Wall of Endorsers.
    
    If you did not submit this endorsement, please ignore this email.
    
    Best regards,
    The NESA-Africa 2025 Team
  `;
  
  return await sendEmail({
    to: email,
    subject: 'Verify Your NESA-Africa 2025 Endorsement',
    html,
    text
  });
}

export async function sendApprovalEmail({
  email,
  name,
  organization,
  endorsementId
}: {
  email: string;
  name: string;
  organization: string;
  endorsementId: string;
}): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nesa.africa';
  const showcaseUrl = `${baseUrl}/get-involved/endorse-nesa-africa/showcase`;
  const statusUrl = `${baseUrl}/get-involved/endorse-nesa-africa/status`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your NESA-Africa 2025 Endorsement Has Been Approved!</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #ea580c;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header img {
          max-width: 200px;
        }
        .content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
        .button {
          display: inline-block;
          background-color: #ea580c;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .success-box {
          background-color: #ecfdf5;
          border: 1px solid #d1fae5;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
        }
        .highlight {
          font-weight: bold;
          color: #ea580c;
        }
        .divider {
          border-top: 1px solid #e5e7eb;
          margin: 25px 0;
        }
        .social-links {
          text-align: center;
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
        }
        .certificate {
          background-color: #fffbeb;
          border: 1px dashed #fbbf24;
          border-radius: 4px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${baseUrl}/images/nesa-logo-white.png" alt="NESA-Africa Logo">
        </div>
        <div class="content">
          <h1>Congratulations! Your Endorsement is Approved</h1>
          
          <p>Dear <span class="highlight">${name}</span>,</p>
          
          <div class="success-box">
            <p><strong>Great news!</strong> Your endorsement of NESA-Africa 2025 on behalf of <span class="highlight">${organization}</span> has been approved and is now live on our Wall of Endorsers.</p>
          </div>
          
          <p>Thank you for joining the movement to transform education across Africa. Your support helps us build momentum for this important initiative.</p>
          
          <div class="certificate">
            <h3>Official Endorser</h3>
            <p>This certifies that</p>
            <h2>${organization}</h2>
            <p>is an official endorser of NESA-Africa 2025</p>
            <p><small>Endorsement ID: ${endorsementId}</small></p>
          </div>
          
          <div style="text-align: center;">
            <a href="${showcaseUrl}" class="button">View Wall of Endorsers</a>
          </div>
          
          <div class="divider"></div>
          
          <h3>Share Your Endorsement</h3>
          <p>Help us spread the word about NESA-Africa 2025 by sharing your endorsement on social media:</p>
          
          <div class="social-links">
            <a href="https://twitter.com/intent/tweet?text=We're%20proud%20to%20endorse%20NESA-Africa%202025%2C%20supporting%20quality%20education%20across%20Africa!%20%23NESAAfrica2025%20%23EducationInAfrica&url=${encodeURIComponent(showcaseUrl)}" target="_blank">Twitter</a> | 
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(showcaseUrl)}" target="_blank">LinkedIn</a> | 
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(showcaseUrl)}" target="_blank">Facebook</a>
          </div>
          
          <p>You can check your endorsement status anytime at: <a href="${statusUrl}">${statusUrl}</a></p>
          
          <p>Thank you again for your support!</p>
          
          <p>Best regards,<br>
          The NESA-Africa 2025 Team</p>
        </div>
        <div class="footer">
          <p>© 2024 NESA-Africa. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
          <p>
            <a href="${baseUrl}">Website</a> | 
            <a href="${baseUrl}/get-involved">Get Involved</a> | 
            <a href="${baseUrl}/contact">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Your NESA-Africa 2025 Endorsement Has Been Approved!
    
    Dear ${name},
    
    Congratulations! Your endorsement of NESA-Africa 2025 on behalf of ${organization} has been approved.
    
    Your endorsement is now visible on our Wall of Endorsers:
    ${showcaseUrl}
    
    Your endorsement ID is: ${endorsementId}
    
    You can check your endorsement status anytime at:
    ${statusUrl}
    
    Thank you for supporting NESA-Africa 2025!
    
    Best regards,
    The NESA-Africa 2025 Team
  `;
  
  return await sendEmail({
    to: email,
    subject: 'Your NESA-Africa 2025 Endorsement Has Been Approved!',
    html,
    text
  });
}

export async function sendRejectionEmail({
  email,
  name,
  organization,
  endorsementId,
  reason
}: {
  email: string;
  name: string;
  organization: string;
  endorsementId: string;
  reason: string;
}): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nesa.africa';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Update on Your NESA-Africa 2025 Endorsement</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #ea580c;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header img {
          max-width: 200px;
        }
        .content {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 0 0 8px 8px;
          border: 1px solid #e5e7eb;
          border-top: none;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #6b7280;
        }
        .button {
          display: inline-block;
          background-color: #ea580c;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .info-box {
          background-color: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 4px;
          padding: 15px;
          margin: 20px 0;
        }
        .highlight {
          font-weight: bold;
          color: #ea580c;
        }
        .divider {
          border-top: 1px solid #e5e7eb;
          margin: 25px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${baseUrl}/images/nesa-logo-white.png" alt="NESA-Africa Logo">
        </div>
        <div class="content">
          <h1>Update on Your Endorsement</h1>
          
          <p>Dear <span class="highlight">${name}</span>,</p>
          
          <p>Thank you for your interest in endorsing NESA-Africa 2025 on behalf of <span class="highlight">${organization}</span>.</p>
          
          <div class="info-box">
            <p><strong>After careful review, we regret to inform you that we are unable to approve your endorsement at this time.</strong></p>
            <p><strong>Reason:</strong> ${reason}</p>
          </div>
          
          <p>Your endorsement ID is: ${endorsementId}</p>
          
          <p>If you would like to discuss this further or submit a revised endorsement, please contact us at <a href="mailto:endorse@nesa.africa">endorse@nesa.africa</a>.</p>
          
          <div class="divider"></div>
          
          <p>We appreciate your interest in NESA-Africa 2025 and hope to work with you in the future.</p>
          
          <p>Best regards,<br>
          The NESA-Africa 2025 Team</p>
        </div>
        <div class="footer">
          <p>© 2024 NESA-Africa. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
          <p>
            <a href="${baseUrl}">Website</a> | 
            <a href="${baseUrl}/get-involved">Get Involved</a> | 
            <a href="${baseUrl}/contact">Contact Us</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  const text = `
    Update on Your NESA-Africa 2025 Endorsement
    
    Dear ${name},
    
    Thank you for your interest in endorsing NESA-Africa 2025 on behalf of ${organization}.
    
    After careful review, we regret to inform you that we are unable to approve your endorsement at this time.
    
    Reason: ${reason}
    
    Your endorsement ID is: ${endorsementId}
    
    If you would like to discuss this further or submit a revised endorsement, please contact us at endorse@nesa.africa.
    
    Best regards,
    The NESA-Africa 2025 Team
  `;
  
  return await sendEmail({
    to: email,
    subject: 'Update on Your NESA-Africa 2025 Endorsement',
    html,
    text
  });
}