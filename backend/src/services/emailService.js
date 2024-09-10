    const transporter = require('../config/emailConfig');
    const { getEmailTemplate } = require('../utils/emailTemplate');

    const sendEmail = async (to, subject, type, context) => {
        const html = getEmailTemplate(type, context);

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to,
                subject,
                html,
            });
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Email send failed');
        }
    };

    module.exports = {sendEmail};
