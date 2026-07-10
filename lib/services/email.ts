import "server-only";

type TransactionalEmail = { to: string; subject: string; html: string };

/** Minimal provider boundary. Resend is optional locally and mandatory in production deployments. */
export async function sendTransactionalEmail({ to, subject, html }: TransactionalEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email delivery is not configured. Set RESEND_API_KEY and EMAIL_FROM.");
    }
    console.info(`[email:development] Would send “${subject}” to ${to}. Configure RESEND_API_KEY to deliver it.`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Email provider rejected the message (${response.status}): ${detail}`);
  }
}

function emailShell(title: string, copy: string, url: string, cta: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f7fb;font-family:Inter,Arial,sans-serif;color:#14213d"><main style="max-width:560px;margin:32px auto;background:#fff;border-radius:18px;padding:40px;border:1px solid #eaecf0"><div style="font-weight:800;letter-spacing:-.5px;font-size:18px;margin-bottom:32px">Business Operations OS</div><h1 style="font-size:24px;margin:0 0 12px">${title}</h1><p style="line-height:1.6;color:#526071">${copy}</p><a href="${url}" style="display:inline-block;margin:16px 0 24px;background:#3255ff;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700">${cta}</a><p style="font-size:12px;line-height:1.5;color:#7a8494">If you did not request this, you can safely ignore this email.</p></main></body></html>`;
}

export const verificationEmail = (url: string) => emailShell("Verify your work email", "Confirm your email address to activate your secure Business Operations OS workspace.", url, "Verify email");
export const passwordResetEmail = (url: string) => emailShell("Reset your password", "A password reset was requested for your account. This link expires shortly.", url, "Reset password");
