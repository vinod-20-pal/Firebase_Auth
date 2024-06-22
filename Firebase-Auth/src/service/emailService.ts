// src/services/emailService.ts

import transporter from '../config/nodemailer';

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, 
      to, 
      subject,
      text,
      html,
    });

    console.log('Message sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
