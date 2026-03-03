"use server";

import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const getTransporter = () => {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
        throw new Error("SMTP_USER or SMTP_PASS is not defined in environment variables.");
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "ssl0.ovh.net",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: { user, pass },
    });
};

// ─── Brand Assets (loaded from public/ at request time) ──────────────────────
const getStampDataUri = () => {
    try {
        // Use the white variant for visibility on the dark navy footer background
        const stampPath = path.join(process.cwd(), "public", "stamp-lianet-white.svg");
        const svgContent = fs.readFileSync(stampPath, "utf-8");
        const b64 = Buffer.from(svgContent).toString("base64");
        return `data:image/svg+xml;base64,${b64}`;
    } catch { return ""; }
};

const getPictogramDataUri = () => {
    try {
        const picPath = path.join(process.cwd(), "public", "pictogram-lianet.png");
        const bytes = fs.readFileSync(picPath);
        return `data:image/png;base64,${bytes.toString("base64")}`;
    } catch { return ""; }
};

// ─── Brand colors ─────────────────────────────────────────────────────────────
const BRAND = {
    navy: "#1B365D",
    teal: "#40B4A6",
    light: "#F8FAFC",
    border: "#E2EAF4",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const badge = (text: string, color = BRAND.teal) => `
  <span style="display:inline-block;padding:4px 14px;background:${color}18;border:1px solid ${color}40;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:0.2em;color:${color};text-transform:uppercase;">
    ${text}
  </span>`;

const infoRow = (label: string, value: string) => `
  <tr>
    <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};">
      <span style="font-size:11px;font-weight:700;letter-spacing:0.2em;color:${BRAND.navy}80;text-transform:uppercase;display:block;margin-bottom:4px;">${label}</span>
      <span style="font-size:15px;color:${BRAND.navy};font-weight:500;">${value}</span>
    </td>
  </tr>`;

// ─── Email wrapper with stamp & pictogram ─────────────────────────────────────
const emailWrapper = (content: string, title: string) => {
    const stampUri = getStampDataUri();
    const picUri = getPictogramDataUri();

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#EEF2F8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EEF2F8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- ── HEADER ─────────────────────────────────────────── -->
          <tr>
            <td style="background:${BRAND.navy};border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center;position:relative;">

              <!-- Pictogram + Wordmark side by side -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;padding-right:14px;">
                    ${picUri ? `<img src="${picUri}" alt="Lianet" width="44" height="44" style="display:block;border:none;outline:none;" />` : ""}
                  </td>
                  <td style="vertical-align:middle;text-align:left;">
                    <span style="font-size:26px;font-weight:900;letter-spacing:-0.03em;color:#ffffff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:1;">
                      LIANET
                    </span>
                    <span style="display:block;font-size:9px;font-weight:700;letter-spacing:0.4em;color:${BRAND.teal};text-transform:uppercase;margin-top:3px;">
                      STRATEGIC EXCELLENCE
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Accent bar -->
              <div style="margin-top:24px;height:1px;background:linear-gradient(to right, transparent, ${BRAND.teal}80, transparent);"></div>

            </td>
          </tr>

          <!-- ── CONTENT CARD ───────────────────────────────────── -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- ── STAMP + FOOTER ─────────────────────────────────── -->
          <tr>
            <td style="background:${BRAND.navy};border-radius:0 0 16px 16px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Links left -->
                  <td style="text-align:left;vertical-align:middle;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.3em;color:rgba(255,255,255,0.4);text-transform:uppercase;">
                      DAKAR, SÉNÉGAL
                    </p>
                    <p style="margin:6px 0 0;">
                      <a href="mailto:contact@lianet.sn" style="color:${BRAND.teal};text-decoration:none;font-size:12px;">contact@lianet.sn</a>
                      &nbsp;·&nbsp;
                      <a href="https://lianet.sn" style="color:${BRAND.teal};text-decoration:none;font-size:12px;">lianet.sn</a>
                    </p>
                  </td>
                  <!-- Stamp right -->
                  ${stampUri ? `
                  <td style="text-align:right;vertical-align:middle;width:80px;">
                    <img src="${stampUri}" alt="Tampon Lianet" width="72" height="72" style="display:inline-block;border:none;outline:none;opacity:0.85;" />
                  </td>` : ""}
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

// ─── Ambition / Role label maps ───────────────────────────────────────────────
const AMBITION_LABELS: Record<string, string> = {
    code: "Bâtir un produit (Code & Design)",
    growth: "Propulser ma croissance (Marketing & CM)",
    squad: "Une Squad dédiée (SaaS)",
    other: "Autre défi stratégique",
};

const ROLE_LABELS: Record<string, string> = {
    fullstack: "Full-stack Developer",
    mobile: "Mobile Developer",
    cloud: "Cloud Architect",
    product: "Product Designer (UI/UX)",
    brand: "Graphic / Brand Designer",
    motion: "Motion Designer",
    community: "Community Manager",
    copywriter: "Content Strategist / Copywriter",
    seo: "SEO/SEA Specialist",
    growth: "Growth & Data Marketer",
};

const TRACK_LABELS: Record<string, string> = {
    expert: "Pôle d'Impact (Expert)",
    team: "Pôle de Construction (Team)",
};

// ─── Contact form email ───────────────────────────────────────────────────────
export async function sendContactEmail(formData: {
    name: string;
    email: string;
    company: string;
    ambition: string;
    briefing: string;
}) {
    try {
        const ambitionLabel = AMBITION_LABELS[formData.ambition] || formData.ambition;

        const content = `
          <div style="margin-bottom:28px;">
            ${badge("Nouveau Lead")}
            &nbsp;
            ${badge("Contact Form", BRAND.navy)}
          </div>

          <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:${BRAND.navy};letter-spacing:-0.02em;">
            Nouvelle transmission reçue
          </h1>
          <p style="margin:0 0 32px;font-size:15px;color:${BRAND.navy}80;">
            Un nouveau projet vient d'être soumis via le portail Lianet.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0">
            ${infoRow("Identité", formData.name)}
            ${infoRow("Email", formData.email)}
            ${infoRow("Organisation / Projet", formData.company || "—")}
            ${infoRow("Ambition sélectionnée", ambitionLabel)}
          </table>

          <div style="margin-top:28px;background:${BRAND.light};border-radius:12px;padding:24px;border-left:3px solid ${BRAND.teal};">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:${BRAND.navy}80;">
              Le Briefing
            </p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:${BRAND.navy};">
              ${formData.briefing.replace(/\n/g, "<br/>")}
            </p>
          </div>

          <p style="margin-top:32px;font-size:13px;color:${BRAND.navy}60;font-style:italic;">
            Répondez directement à cet email pour contacter le client à
            <a href="mailto:${formData.email}" style="color:${BRAND.teal};text-decoration:none;">${formData.email}</a>.
          </p>`;

        const transporter = getTransporter();
        await transporter.sendMail({
            from: `"Lianet Portail" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            replyTo: formData.email,
            subject: `[Lead] ${formData.name} — ${ambitionLabel}`,
            html: emailWrapper(content, "Nouveau Lead Lianet"),
        });
        return { success: true };
    } catch (error) {
        console.error("Error sending contact email:", error);
        return { success: false, error: "Failed to send message" };
    }
}

// ─── Network recruitment email ────────────────────────────────────────────────
export async function sendNetworkEmail(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const role = formData.get("role") as string;
        const otherRole = formData.get("otherRole") as string;
        const social = formData.get("social") as string;
        const track = formData.get("track") as string;
        const file = formData.get("file") as File | null;

        const roleLabel = role === "other" ? otherRole : (ROLE_LABELS[role] || role);
        const trackLabel = TRACK_LABELS[track] || track;

        const content = `
          <div style="margin-bottom:28px;">
            ${badge("Candidature")}
            &nbsp;
            ${badge(trackLabel, BRAND.navy)}
          </div>

          <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:${BRAND.navy};letter-spacing:-0.02em;">
            Nouvelle candidature réseau
          </h1>
          <p style="margin:0 0 32px;font-size:15px;color:${BRAND.navy}80;">
            Un profil vient de soumettre sa candidature via le Fast-Track System.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0">
            ${infoRow("Nom complet", name)}
            ${infoRow("Email professionnel", email)}
            ${infoRow("Expertise / Rôle", roleLabel)}
            ${infoRow("Track sélectionné", trackLabel)}
            ${infoRow("Lien d'impact", `<a href="${social}" style="color:${BRAND.teal};text-decoration:none;word-break:break-all;">${social}</a>`)}
          </table>

          <p style="margin-top:32px;font-size:13px;color:${BRAND.navy}60;font-style:italic;">
            Répondez directement à cet email pour contacter le candidat à
            <a href="mailto:${email}" style="color:${BRAND.teal};text-decoration:none;">${email}</a>.
          </p>

          ${file && file.size > 0 ? `
          <div style="margin-top:20px;padding:16px;background:${BRAND.teal}10;border:1px solid ${BRAND.teal}30;border-radius:10px;font-size:13px;color:${BRAND.navy}80;">
            📎 Un CV / Portfolio est joint à cet email.
          </div>` : ""}`;

        const mailOptions: any = {
            from: `"Lianet Network" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: `[Network] ${name} — ${roleLabel} (${trackLabel})`,
            html: emailWrapper(content, "Candidature Lianet Network"),
        };

        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            mailOptions.attachments = [{ filename: file.name, content: buffer }];
        }

        const transporter = getTransporter();
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Error sending network email:", error);
        return { success: false, error: "Failed to send application" };
    }
}

// ─── Manifeste (homepage quick form) email ────────────────────────────────────
export async function sendManifesteEmail(formData: {
    email: string;
    ambition: string;
}) {
    try {
        const content = `
          <div style="margin-bottom:28px;">
            ${badge("Quick Lead")}
            &nbsp;
            ${badge("Manifeste Form", BRAND.navy)}
          </div>

          <h1 style="margin:0 0 8px;font-size:26px;font-weight:900;color:${BRAND.navy};letter-spacing:-0.02em;">
            Nouveau lead — Formulaire Manifeste
          </h1>
          <p style="margin:0 0 32px;font-size:15px;color:${BRAND.navy}80;">
            Un visiteur a soumis son ambition depuis la page d'accueil.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0">
            ${infoRow("Email", formData.email)}
          </table>

          <div style="margin-top:28px;background:${BRAND.light};border-radius:12px;padding:24px;border-left:3px solid ${BRAND.teal};">
            <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:${BRAND.navy}80;">
              L'Ambition
            </p>
            <p style="margin:0;font-size:15px;line-height:1.7;color:${BRAND.navy};">
              ${formData.ambition.replace(/\n/g, "<br/>")}
            </p>
          </div>

          <p style="margin-top:32px;font-size:13px;color:${BRAND.navy}60;font-style:italic;">
            Répondez directement à cet email pour contacter le visiteur à
            <a href="mailto:${formData.email}" style="color:${BRAND.teal};text-decoration:none;">${formData.email}</a>.
          </p>`;

        const transporter = getTransporter();
        await transporter.sendMail({
            from: `"Lianet Manifeste" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            replyTo: formData.email,
            subject: `[Manifeste] Nouveau lead — ${formData.email}`,
            html: emailWrapper(content, "Lead Manifeste Lianet"),
        });
        return { success: true };
    } catch (error) {
        console.error("Error sending manifeste email:", error);
        return { success: false, error: "Failed to send" };
    }
}
