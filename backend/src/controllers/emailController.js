const emailService = require('../services/emailService');

exports.sendEmail = async (req, res) => {
    const { data } = req.body;
    const { name, email, message } = data;
    if (!name || !email || !message) return res.status(400).json({ message: 'Missing required fields' });

    try {
        await emailService.sendEmail('rahulgavane65@gmail.com', 'Contact Us Request Received', 'contactus', { name, email, message });

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
};
