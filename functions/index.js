import { config, firestore } from "firebase-functions/v2";
import { initializeApp } from "firebase-admin";
import { createTransport } from "nodemailer";

initializeApp();

// pull creds from env config
const { user, pass } = config().email;

const transporter = createTransport({
    service: "gmail",
    auth: { user, pass },
});

export const sendTicketEmail = firestore
    .document("tickets/{id}")
    .onCreate(async (snap) => {
        const data = snap.data();

        const mailOpts = {
            from: `"RohiDesk" <${user}>`,
            to: data.userEmail,                     // field saved from client
            subject: `Ticket Received • ${snap.id}`,
            text: `
Hi there,

Your ticket was created successfully on RohiDesk.

Ticket ID   : ${snap.id}
Category    : ${data.category}
Priority    : ${data.priority}
Description : ${data.description}

We’ll get back to you shortly.

– RohiDesk Support
      `.trim(),
        };

        try {
            await transporter.sendMail(mailOpts);
            console.log("✓ Email sent to", data.userEmail);
        } catch (err) {
            console.error("✗ Email failed", err);
        }
    });
