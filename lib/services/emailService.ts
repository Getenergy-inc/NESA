import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const getEmailTemplate = (type: "nominee" | "nominator", data: any) => {
  const baseStyles = `
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #FFC247 0%, #E48900 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
      .header h1 { color: #191307; margin: 0; font-size: 28px; font-weight: bold; }
      .header p { color: #191307; margin: 10px 0 0 0; font-size: 16px; }
      .content { background: #ffffff; padding: 40px 30px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; }
      .content h2 { color: #E48900; margin-top: 0; }
      .highlight-box { background: #FFF9ED; border-left: 4px solid #FFC247; padding: 20px; margin: 20px 0; border-radius: 5px; }
      .button { display: inline-block; background: linear-gradient(135deg, #FFC247 0%, #E48900 100%); color: #191307 !important; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
      .footer { background: #191307; color: #FFC247; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
      .footer a { color: #FFC247; text-decoration: none; }
      .divider { height: 2px; background: linear-gradient(90deg, #FFC247 0%, #E48900 100%); margin: 30px 0; }
      ul { padding-left: 20px; }
      li { margin: 10px 0; }
    </style>
  `;

  if (type === "nominee") {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${baseStyles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏆 NESA-Africa 2025</h1>
            <p>Network for Education and Skills in Africa</p>
          </div>
          
          <div class="content">
            <h2>Congratulations! You've Been Nominated! 🎉</h2>
            
            <p>Dear <strong>${data.nomineeName}</strong>,</p>
            
            <p>We are thrilled to inform you that you have been nominated for the prestigious <strong>NESA-Africa 2025 Awards</strong>!</p>
            
            <div class="highlight-box">
              <strong>📋 Nomination Details:</strong><br>
              <strong>Category:</strong> ${data.category}<br>
              <strong>Subcategory:</strong> ${data.subcategory}<br>
              <strong>Nominated by:</strong> ${data.nominatorName}
            </div>
            
            <p><strong>Why you were nominated:</strong></p>
            <p style="font-style: italic; color: #666; padding-left: 20px; border-left: 3px solid #FFC247;">
              "${data.achievement}"
            </p>
            
            <div class="divider"></div>
            
            <h3 style="color: #E48900;">About NESA-Africa Awards</h3>
            <p>The NESA-Africa Awards celebrate outstanding contributions to education across the African continent. This recognition honors individuals and organizations making a significant impact in transforming education and empowering communities.</p>
            
            <p><strong>What happens next:</strong></p>
            <ul>
              <li>Your nomination will be reviewed by our expert panel</li>
              <li>Verified nominations enter the judging phase</li>
              <li>Winners will be announced at the NESA-Africa 2025 Gala</li>
              <li>You'll receive updates throughout the process</li>
            </ul>
            
            <div class="highlight-box">
              <strong>🌟 This is a significant achievement!</strong><br>
              Being nominated for NESA-Africa Awards recognizes your dedication to advancing education in Africa. Your work is making a difference!
            </div>
            
            <center>
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }" class="button">
                Learn More About NESA-Africa
              </a>
            </center>
            
            <p>If you have any questions, please don't hesitate to reach out to us.</p>
            
            <p>Warm regards,<br>
            <strong>The NESA-Africa Team</strong></p>
          </div>
          
          <div class="footer">
            <p><strong>NESA-Africa 2025</strong></p>
            <p>Celebrating Excellence in African Education</p>
            <p style="margin-top: 20px;">
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }">Visit Website</a> | 
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }/about">About Us</a> | 
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }/contact">Contact</a>
            </p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              © 2025 NESA-Africa. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  } else {
    // Nominator email
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${baseStyles}
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏆 NESA-Africa 2025</h1>
            <p>Network for Education and Skills in Africa</p>
          </div>
          
          <div class="content">
            <h2>Thank You for Your Nomination! 🙏</h2>
            
            <p>Dear <strong>${data.nominatorName}</strong>,</p>
            
            <p>Thank you for taking the time to nominate an outstanding individual/organization for the <strong>NESA-Africa 2025 Awards</strong>!</p>
            
            <div class="highlight-box">
              <strong>✅ Nomination Confirmed</strong><br>
              Your nomination has been successfully submitted and is now under review by our team.
            </div>
            
            <p><strong>Nomination Summary:</strong></p>
            <ul>
              <li><strong>Nominee:</strong> ${data.nomineeName}</li>
              <li><strong>Category:</strong> ${data.category}</li>
              <li><strong>Subcategory:</strong> ${data.subcategory}</li>
              <li><strong>Submitted:</strong> ${new Date().toLocaleDateString(
                "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}</li>
            </ul>
            
            <div class="divider"></div>
            
            <h3 style="color: #E48900;">What Happens Next?</h3>
            <p>Our team will review the nomination to ensure it meets our criteria. Here's the process:</p>
            <ol>
              <li><strong>Review:</strong> Our team verifies the nomination details</li>
              <li><strong>Notification:</strong> The nominee will be informed of their nomination</li>
              <li><strong>Evaluation:</strong> Expert judges assess all qualified nominations</li>
              <li><strong>Recognition:</strong> Winners are announced at the NESA-Africa 2025 Gala</li>
            </ol>
            
            <div class="highlight-box">
              <strong>🌟 Your Impact Matters!</strong><br>
              By nominating exceptional individuals and organizations, you're helping us recognize and celebrate those who are transforming education across Africa. Thank you for being part of this important mission!
            </div>
            
            <p><strong>About NESA-Africa:</strong></p>
            <p>The Network for Education and Skills in Africa (NESA) is dedicated to advancing quality education across the continent. Our annual awards celebrate innovation, dedication, and impact in the education sector.</p>
            
            <center>
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }/nominate" class="button">
                Nominate Another Changemaker
              </a>
            </center>
            
            <p>We may contact you if we need additional information about your nomination.</p>
            
            <p>Best regards,<br>
            <strong>The NESA-Africa Team</strong></p>
          </div>
          
          <div class="footer">
            <p><strong>NESA-Africa 2025</strong></p>
            <p>Celebrating Excellence in African Education</p>
            <p style="margin-top: 20px;">
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }">Visit Website</a> | 
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }/nominees">View Nominees</a> | 
              <a href="${
                process.env.NEXT_PUBLIC_APP_URL || "https://nesa.africa"
              }/contact">Contact Us</a>
            </p>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              © 2025 NESA-Africa. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
};

// Send nomination confirmation emails
export async function sendNominationEmails(nominationData: {
  nomineeName: string;
  nomineeEmail: string;
  nominatorName: string;
  nominatorEmail: string;
  category: string;
  subcategory: string;
  achievement: string;
}) {
  try {
    // Send email to nominee
    const nomineeEmail = {
      from: `"NESA-Africa Awards" <${
        process.env.SMTP_FROM || process.env.SMTP_USER
      }>`,
      to: nominationData.nomineeEmail,
      subject: "🏆 You've Been Nominated for NESA-Africa 2025 Awards!",
      html: getEmailTemplate("nominee", nominationData),
    };

    // Send email to nominator
    const nominatorEmail = {
      from: `"NESA-Africa Awards" <${
        process.env.SMTP_FROM || process.env.SMTP_USER
      }>`,
      to: nominationData.nominatorEmail,
      subject: "✅ Thank You for Your NESA-Africa 2025 Nomination",
      html: getEmailTemplate("nominator", nominationData),
    };

    // Send both emails
    const [nomineeResult, nominatorResult] = await Promise.all([
      transporter.sendMail(nomineeEmail),
      transporter.sendMail(nominatorEmail),
    ]);

    console.log("Emails sent successfully:", {
      nominee: nomineeResult.messageId,
      nominator: nominatorResult.messageId,
    });

    return { success: true, nomineeResult, nominatorResult };
  } catch (error) {
    console.error("Error sending emails:", error);
    throw error;
  }
}

export default { sendNominationEmails };
