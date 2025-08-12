// Email template component for sponsor welcome emails
// This would typically be used with an email service like SendGrid, Mailgun, or similar

interface SponsorWelcomeEmailProps {
  sponsorName: string;
  companyName: string;
  applicationId: string;
  selectedPlan: {
    name: string;
    price: number;
    tier: string;
  };
  paymentInstructions: {
    bankDetails?: {
      bankName: string;
      accountName: string;
      accountNumber: string;
      routingNumber: string;
      swiftCode: string;
    };
    paypalEmail?: string;
    stripeLink?: string;
  };
}

export const SponsorWelcomeEmailTemplate = ({
  sponsorName,
  companyName,
  applicationId,
  selectedPlan,
  paymentInstructions
}: SponsorWelcomeEmailProps) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to NESA-Africa 2025 - Sponsorship Confirmation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .header {
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .highlight-box {
            background: #fef3c7;
            border: 2px solid #f59e0b;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .payment-box {
            background: #f0f9ff;
            border: 2px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: #f3f4f6;
            border-radius: 8px;
            font-size: 14px;
            color: #6b7280;
        }
        .benefits-list {
            background: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 15px;
            margin: 15px 0;
        }
        .timeline {
            background: #fafafa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .timeline-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .timeline-dot {
            width: 12px;
            height: 12px;
            background: #f59e0b;
            border-radius: 50%;
            margin-right: 15px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎉 Welcome to NESA-Africa 2025!</h1>
        <p>Thank you for partnering with us to transform African education</p>
    </div>
    
    <div class="content">
        <h2>Dear ${sponsorName},</h2>
        
        <p>We are thrilled to welcome <strong>${companyName}</strong> as a sponsor of NESA-Africa 2025! Your commitment to advancing education across the continent is truly inspiring.</p>
        
        <div class="highlight-box">
            <h3>📋 Your Sponsorship Details</h3>
            <p><strong>Application ID:</strong> ${applicationId}</p>
            <p><strong>Sponsorship Package:</strong> ${selectedPlan.name}</p>
            <p><strong>Tier:</strong> ${selectedPlan.tier}</p>
            <p><strong>Investment Amount:</strong> $${selectedPlan.price.toLocaleString()}</p>
            <p><strong>Status:</strong> Pending Payment</p>
        </div>

        <div class="benefits-list">
            <h3>🌟 Your Sponsorship Benefits Include:</h3>
            <ul>
                <li>✅ Digital Certificate of Social Impact</li>
                <li>✅ Recognition on nesa.africa website with backlinks</li>
                <li>✅ Logo placement in NESA Annual Report</li>
                <li>✅ Digital badges for your website and social media</li>
                <li>✅ VIP access to awards ceremony and networking events</li>
                <li>✅ Media coverage and press release features</li>
                <li>✅ Direct impact on African education initiatives</li>
            </ul>
        </div>

        <div class="payment-box">
            <h3>💳 Payment Instructions</h3>
            <p>To complete your sponsorship, please process payment using one of the following methods:</p>
            
            ${paymentInstructions.bankDetails ? `
            <h4>🏦 Bank Transfer (Recommended for large amounts)</h4>
            <p><strong>Bank Name:</strong> ${paymentInstructions.bankDetails.bankName}</p>
            <p><strong>Account Name:</strong> ${paymentInstructions.bankDetails.accountName}</p>
            <p><strong>Account Number:</strong> ${paymentInstructions.bankDetails.accountNumber}</p>
            <p><strong>Routing Number:</strong> ${paymentInstructions.bankDetails.routingNumber}</p>
            <p><strong>SWIFT Code:</strong> ${paymentInstructions.bankDetails.swiftCode}</p>
            <p><strong>Reference:</strong> ${applicationId}</p>
            ` : ''}
            
            ${paymentInstructions.paypalEmail ? `
            <h4>💰 PayPal</h4>
            <p>Send payment to: <strong>${paymentInstructions.paypalEmail}</strong></p>
            <p>Include reference: <strong>${applicationId}</strong></p>
            ` : ''}
            
            ${paymentInstructions.stripeLink ? `
            <h4>💳 Credit Card (Stripe)</h4>
            <a href="${paymentInstructions.stripeLink}" class="button">Pay with Credit Card</a>
            ` : ''}
            
            <p><strong>⚠️ Important:</strong> Payment must be completed within 7 days to secure your sponsorship benefits.</p>
        </div>

        <div class="timeline">
            <h3>📅 What Happens Next?</h3>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>
                    <strong>Step 1:</strong> Complete payment using instructions above
                    <br><small>Within 7 days</small>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>
                    <strong>Step 2:</strong> Receive payment confirmation and sponsorship certificate
                    <br><small>1-2 business days after payment</small>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>
                    <strong>Step 3:</strong> Benefits activation and brand integration begins
                    <br><small>Within 3-5 business days</small>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>
                    <strong>Step 4:</strong> Receive VIP passes and event details
                    <br><small>30 days before event</small>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
            <a href="https://nesa.africa/sponsor-tracker?id=${applicationId}" class="button">
                Track Your Application
            </a>
        </div>

        <h3>🤝 Your Partnership Impact</h3>
        <p>Your sponsorship directly contributes to:</p>
        <ul>
            <li>🎓 Educational scholarships for deserving African students</li>
            <li>🏫 School rebuilding initiatives across the continent</li>
            <li>📚 Development of educational resources and programs</li>
            <li>🌍 Strengthening educational networks across 54+ countries</li>
            <li>📺 NESA TV educational content production</li>
        </ul>

        <p>We are excited to showcase your commitment to African education and look forward to a successful partnership!</p>

        <p>Best regards,<br>
        <strong>The NESA-Africa 2025 Partnerships Team</strong></p>
    </div>
    
    <div class="footer">
        <p><strong>Need Help?</strong></p>
        <p>📧 partnerships@nesa.africa | 📞 +234-907-962-1110</p>
        <p>🌐 <a href="https://nesa.africa">nesa.africa</a> | Follow us on social media @NESAAfrica</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px;">
            This email was sent to confirm your NESA-Africa 2025 sponsorship application.<br>
            © 2025 NESA-Africa. All rights reserved.
        </p>
    </div>
</body>
</html>
  `;
};

// Usage example for the email service
export const sendSponsorWelcomeEmail = async (emailData: SponsorWelcomeEmailProps & { email: string }) => {
  const htmlContent = SponsorWelcomeEmailTemplate(emailData);
  
  // This would integrate with your email service
  // Example with a generic email service:
  /*
  const emailService = {
    to: emailData.email,
    subject: `Welcome to NESA-Africa 2025 - Sponsorship Confirmation (${emailData.applicationId})`,
    html: htmlContent,
    from: 'partnerships@nesa.africa',
    replyTo: 'partnerships@nesa.africa'
  };
  
  return await sendEmail(emailService);
  */
  
  return htmlContent;
};