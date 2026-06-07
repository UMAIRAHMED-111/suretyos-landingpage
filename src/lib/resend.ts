import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const FROM = import.meta.env.FROM_EMAIL ?? 'noreply@suretyos.com';
const NOTIFY = import.meta.env.NOTIFY_EMAIL ?? 'founder@suretyos.com';

export async function sendConfirmationEmail(params: {
  name: string;
  email: string;
  agencyName: string;
}) {
  const { name, email, agencyName } = params;
  const firstName = name.split(' ')[0];

  return resend.emails.send({
    from: `SuretyOS <${FROM}>`,
    to: email,
    subject: "You're a SuretyOS founding agency — here's what's next",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="font-family: -apple-system, 'Inter', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #1f1f2e; line-height: 1.6;">
  <div style="margin-bottom: 32px;">
    <span style="font-size: 18px; font-weight: 700; color: #1a3a5c; letter-spacing: -0.01em;">SuretyOS</span>
  </div>

  <h1 style="font-size: 22px; font-weight: 700; color: #1a3a5c; margin-bottom: 16px; letter-spacing: -0.01em;">
    ${firstName}, ${agencyName} is in.
  </h1>

  <p style="margin-bottom: 16px; color: #475569;">
    You've claimed a founding spot for ${agencyName}. We'll be in touch within 48 hours to set up a quick 15-minute call and walk you through what's coming.
  </p>

  <p style="margin-bottom: 16px; color: #475569;">
    As a founding agency, you'll lock in lifetime founder pricing — it never increases, regardless of what we charge when we launch publicly.
  </p>

  <p style="margin-bottom: 32px; color: #475569;">
    In the meantime, if you think of anything specific that costs you time in your current workflow, reply directly to this email. We read everything.
  </p>

  <p style="color: #475569; margin-bottom: 4px;">Talk soon,</p>
  <p style="font-weight: 600; color: #1a3a5c;">The SuretyOS team</p>

  <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #eef3f8; font-size: 12px; color: #6b7280;">
    SuretyOS · Built for surety bond agencies · <a href="https://suretyos.com/privacy" style="color: #0e7c86;">Privacy policy</a>
  </div>
</body>
</html>`,
  });
}

export async function sendInternalNotification(params: {
  name: string;
  email: string;
  agencyName: string;
  bondTypes: string[];
  monthlyVolume: string;
  workflowPain?: string;
}) {
  const { name, email, agencyName, bondTypes, monthlyVolume, workflowPain } = params;

  return resend.emails.send({
    from: `SuretyOS Signups <${FROM}>`,
    to: NOTIFY,
    subject: `New founding agency: ${agencyName} (${monthlyVolume} bonds/mo)`,
    html: `
<!DOCTYPE html>
<html>
<body style="font-family: monospace; max-width: 560px; margin: 0 auto; padding: 24px; color: #1f1f2e; line-height: 1.5;">
  <h2 style="font-size: 18px; margin-bottom: 16px;">New founding agency signup</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 6px 0; color: #6b7280; width: 160px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name}</td></tr>
    <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0e7c86;">${email}</a></td></tr>
    <tr><td style="padding: 6px 0; color: #6b7280;">Agency</td><td style="padding: 6px 0;">${agencyName}</td></tr>
    <tr><td style="padding: 6px 0; color: #6b7280;">Bond types</td><td style="padding: 6px 0;">${bondTypes.join(', ')}</td></tr>
    <tr><td style="padding: 6px 0; color: #6b7280;">Volume</td><td style="padding: 6px 0;">${monthlyVolume}</td></tr>
    ${workflowPain ? `<tr><td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Pain point</td><td style="padding: 6px 0;">${workflowPain}</td></tr>` : ''}
  </table>
  <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">Follow up within 48 hours.</p>
</body>
</html>`,
  });
}
