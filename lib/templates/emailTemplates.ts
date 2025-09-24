import { sendEmail as sendEmailWithNodemailer } from '@/lib/services/emailService';

export interface EmailTemplateParams {
  name: string;
  verificationUrl: string;
}

export const endorsementVerificationEmailTemplate = ({ name, verificationUrl }: EmailTemplateParams): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Endorsement - NESA-Africa 2025</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; }
            .button { display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
            .highlight { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f59e0b; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>NESA-Africa 2025</h1>
                <h2>Endorsement Verification</h2>
            </div>
            
            <div class="content">
                <h3>Dear ${name},</h3>
                
                <p>Thank you for endorsing NESA-Africa 2025! Your support is crucial to our mission of transforming education across the continent.</p>
                
                <p>To finalize your endorsement, please verify your email address by clicking the button below.</p>
                
                <div class="highlight">
                    <strong>Next Step:</strong> Please click the verification button below to confirm your email address.
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" class="button">Verify My Endorsement</a>
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>Once verified, your endorsement will be submitted for review by our team.</li>
                    <li>Upon approval, it will be proudly displayed on our "Wall of Endorsers".</li>
                </ul>
                
                <p><strong>Important:</strong> This verification link will expire in 24 hours for security purposes.</p>
                
                <p>If you did not submit this endorsement, please disregard this email.</p>
                
                <p>Best regards,<br>
                <strong>The NESA-Africa Team</strong></p>
            </div>
            
            <div class="footer">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    📍 54, Fajolu Street, Surulere, Lagos<br>
                    📞 +234-907-962-1110 | +234-810-926-5897<br>
                    ✉️ endorse@nesa.africa
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const judgeVerificationEmailTemplate = ({ name, verificationUrl }: EmailTemplateParams): string => {
  return `
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
            .button { display: inline-block; background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
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
                <h3>Dear ${name},</h3>
                
                <p>Thank you for your interest in becoming a judge for the prestigious New Education Standard Awards 2025!</p>
                
                <div class="highlight">
                    <strong>Next Step:</strong> Please click the verification button below to confirm your email address and complete your application submission.
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" class="button">Verify My Email Address</a>
                </div>
                
                <p><strong>What happens next?</strong></p>
                <ul>
                    <li>Your application will be reviewed by our team.</li>
                    <li>You'll receive an approval notification within 2-3 business days.</li>
                    <li>Once approved, you'll be invited to create your judge account.</li>
                </ul>
                
                <p><strong>Important:</strong> This verification link will expire in 24 hours.</p>
                
                <p>If you did not apply to become a judge, please ignore this email.</p>
                
                <p>Best regards,<br>
                <strong>The NESA-Africa Team</strong></p>
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
  `;
};

// Email service integration helper
export const sendEmail = async (options: { to: string; subject: string; html: string; }) => {
  return sendEmailWithNodemailer(options);
};
