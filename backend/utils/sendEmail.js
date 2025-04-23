const nodemailer = require('nodemailer');
const config = require('../config/config');

/**
 * Send email using nodemailer
 * @param {Object} options - Email options (to, subject, text)
 */
const sendEmail = async (options) => {
  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASSWORD
    }
  });

  // Define email options
  const message = {
    from: `${config.EMAIL_FROM} <${config.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send email
  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;