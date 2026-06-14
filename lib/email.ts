import { Resend } from "resend";
import { prisma } from "./db";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock");
const emailFrom = process.env.EMAIL_FROM || "NextGen Devbhoomi Foundation <noreply@nextgendevbhoomi.org>";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  type: string;
}

export async function sendEmail({ to, subject, html, type }: SendEmailParams) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set. Mocking email delivery to:", to);
      return { success: true, id: "mock-id" };
    }

    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to,
      subject,
      html,
    });

    if (error) {
      throw error;
    }

    // Log success
    await prisma.emailLog.create({
      data: {
        to,
        subject,
        type,
        status: "SUCCESS",
      },
    });

    return { success: true, id: data?.id };
  } catch (error: any) {
    console.error("Resend email delivery error:", error);

    // Log failure
    try {
      await prisma.emailLog.create({
        data: {
          to,
          subject,
          type,
          status: "FAILED",
          error: error.message || "Unknown delivery error",
        },
      });
    } catch (logErr) {
      console.error("Failed to write failed email log:", logErr);
    }

    return { success: false, error: error.message };
  }
}

export const getApplicationSubmittedEmail = (name: string, appId: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #071826; color: #EAF2F8; border-radius: 12px; border: 1px solid #1E3A4C;">
    <div style="text-align: center; border-bottom: 1px solid #1E3A4C; padding-bottom: 20px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">NextGen Devbhoomi Foundation</h1>
      <p style="color: #F97316; margin: 5px 0 0 0; font-weight: bold; text-transform: uppercase; font-size: 12px; tracking-wider: 1px;">Application Confirmed</p>
    </div>
    <div style="padding: 20px 0; line-height: 1.6;">
      <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
      <p>Thank you for applying for the IT Internship Program at NextGen Devbhoomi Foundation! We are excited about your interest in working with us.</p>
      <div style="background-color: #0F2233; padding: 15px; border-radius: 8px; border: 1px solid #1E3A4C; margin: 20px 0; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #slate-400;">Your Unique Application ID</p>
        <h2 style="margin: 5px 0 0 0; color: #F97316; font-size: 22px; letter-spacing: 1px;">${appId}</h2>
      </div>
      <p>Our coordinators and volunteers are currently reviewing submissions. Your application status is initially marked as <strong>PENDING</strong>.</p>
      <p>You can track the progress of your application anytime by logging into your candidate dashboard at <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard" style="color: #F97316; text-decoration: none; font-weight: bold;">Applicant Hub</a>.</p>
    </div>
    <div style="border-top: 1px solid #1E3A4C; padding-top: 20px; text-align: center; font-size: 12px; color: #7F8C8D;">
      <p style="margin: 0;">NextGen Devbhoomi Foundation • Technical Education & Community Empowerment</p>
      <p style="margin: 5px 0 0 0;">Dew, Aurangabad, Bihar - 824125, India</p>
    </div>
  </div>
`;

export const getShortlistedEmail = (name: string, appId: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #071826; color: #EAF2F8; border-radius: 12px; border: 1px solid #1E3A4C;">
    <div style="text-align: center; border-bottom: 1px solid #1E3A4C; padding-bottom: 20px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">NextGen Devbhoomi Foundation</h1>
      <p style="color: #F97316; margin: 5px 0 0 0; font-weight: bold; text-transform: uppercase; font-size: 12px; tracking-wider: 1px;">Congratulations!</p>
    </div>
    <div style="padding: 20px 0; line-height: 1.6;">
      <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
      <p>We are pleased to inform you that your application (ID: <strong>${appId}</strong>) has been <strong>SHORTLISTED</strong> for the next round of our IT Internship Program selection!</p>
      <p>Our team will reach out to you shortly via this email address or your mobile number to schedule a short technical project assessment or interview discussion.</p>
      <p>Please keep checking your student dashboard for timeline updates and details.</p>
    </div>
    <div style="border-top: 1px solid #1E3A4C; padding-top: 20px; text-align: center; font-size: 12px; color: #7F8C8D;">
      <p style="margin: 0;">NextGen Devbhoomi Foundation • Technical Education & Community Empowerment</p>
    </div>
  </div>
`;

export const getSelectedEmail = (name: string, appId: string, domain: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #071826; color: #EAF2F8; border-radius: 12px; border: 1px solid #1E3A4C;">
    <div style="text-align: center; border-bottom: 1px solid #1E3A4C; padding-bottom: 20px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">NextGen Devbhoomi Foundation</h1>
      <p style="color: #4D9A46; margin: 5px 0 0 0; font-weight: bold; text-transform: uppercase; font-size: 12px; tracking-wider: 1px;">Selection Confirmed</p>
    </div>
    <div style="padding: 20px 0; line-height: 1.6;">
      <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
      <p>We are delighted to confirm your selection for the <strong>${domain} Internship</strong> at NextGen Devbhoomi Foundation!</p>
      <p>Your performance and credentials have shown exceptional promise, and we are excited to welcome you aboard as an active intern.</p>
      <div style="background-color: #0F2233; padding: 15px; border-radius: 8px; border: 1px solid #1E3A4C; margin: 20px 0;">
        <h4 style="margin: 0 0 10px 0; color: #F97316; font-size: 14px;">Next Steps:</h4>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #EAF2F8;">
          <li style="margin-bottom: 6px;">Login to your dashboard to download your generated <strong>Official Internship ID Card</strong>.</li>
          <li style="margin-bottom: 6px;">Review the duration and track guidelines sent by your assigned mentor.</li>
          <li style="margin-bottom: 6px;">Join the technical bootcamp group to begin working on active milestones.</li>
        </ul>
      </div>
      <p>If you have any questions, feel free to reply to this email.</p>
    </div>
    <div style="border-top: 1px solid #1E3A4C; padding-top: 20px; text-align: center; font-size: 12px; color: #7F8C8D;">
      <p style="margin: 0;">NextGen Devbhoomi Foundation • Technical Education & Community Empowerment</p>
    </div>
  </div>
`;

export const getRejectedEmail = (name: string, appId: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #071826; color: #EAF2F8; border-radius: 12px; border: 1px solid #1E3A4C;">
    <div style="text-align: center; border-bottom: 1px solid #1E3A4C; padding-bottom: 20px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">NextGen Devbhoomi Foundation</h1>
      <p style="color: #EF4444; margin: 5px 0 0 0; font-weight: bold; text-transform: uppercase; font-size: 12px; tracking-wider: 1px;">Application Status Update</p>
    </div>
    <div style="padding: 20px 0; line-height: 1.6;">
      <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
      <p>Thank you for your application (ID: <strong>${appId}</strong>) and for your interest in the IT Internship Program at NextGen Devbhoomi Foundation.</p>
      <p>After careful review of all submissions, we regret to inform you that we are unable to proceed with your application for this cohort.</p>
      <p>We received an overwhelming number of technical submissions, and selecting candidates was highly competitive. We encourage you to keep building your skills and apply for future internship opportunities.</p>
    </div>
    <div style="border-top: 1px solid #1E3A4C; padding-top: 20px; text-align: center; font-size: 12px; color: #7F8C8D;">
      <p style="margin: 0;">NextGen Devbhoomi Foundation • Technical Education & Community Empowerment</p>
    </div>
  </div>
`;

export const getCompletedEmail = (name: string, appId: string, domain: string, certNumber: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #071826; color: #EAF2F8; border-radius: 12px; border: 1px solid #1E3A4C;">
    <div style="text-align: center; border-bottom: 1px solid #1E3A4C; padding-bottom: 20px;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">NextGen Devbhoomi Foundation</h1>
      <p style="color: #4D9A46; margin: 5px 0 0 0; font-weight: bold; text-transform: uppercase; font-size: 12px; tracking-wider: 1px;">Internship Completed!</p>
    </div>
    <div style="padding: 20px 0; line-height: 1.6;">
      <p style="font-size: 16px;">Dear <strong>${name}</strong>,</p>
      <p>Heartiest congratulations on completing your <strong>${domain} Internship</strong> with NextGen Devbhoomi Foundation!</p>
      <p>We highly appreciate the hard work, dedication, and technical capability you demonstrated during the program.</p>
      <div style="background-color: #0F2233; padding: 15px; border-radius: 8px; border: 1px solid #1E3A4C; margin: 20px 0; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #slate-400;">Your Verified Certificate Number</p>
        <h2 style="margin: 5px 0 0 0; color: #4D9A46; font-size: 20px; letter-spacing: 1px;">${certNumber}</h2>
      </div>
      <p>Your official verifiable certificate has been generated and is available for download on your student portal dashboard.</p>
      <p>We wish you the very best in all your future professional endeavors!</p>
    </div>
    <div style="border-top: 1px solid #1E3A4C; padding-top: 20px; text-align: center; font-size: 12px; color: #7F8C8D;">
      <p style="margin: 0;">NextGen Devbhoomi Foundation • Technical Education & Community Empowerment</p>
    </div>
  </div>
`;
