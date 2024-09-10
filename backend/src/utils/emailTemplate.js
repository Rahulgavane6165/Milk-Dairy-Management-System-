const generateResetPasswordEmailTemplate = (resetLink) => {
    return `
        <h1>Password Reset Request</h1>
        <p>To reset your password, please click the link below:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
    `;
};

// Add more templates here as needed
const generateWelcomeEmailTemplate = (userName) => {
    return `
        <h1>Welcome, ${userName}!</h1>
        <p>Thank you for registering with us. We're excited to have you on board.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
    `;
};

const generateContactUsTemplate = (context) => {
    return `
        <h1>A new rewuest recieved, from  ${context.name}! ${context.email}</h1>
        <p>Message : ${context.message}</p>
    `;
};

const getEmailTemplate = (type, context) => {
    switch (type) {
        case 'resetPassword':
            return generateResetPasswordEmailTemplate(context.resetLink);
        case 'welcome':
            return generateWelcomeEmailTemplate(context.userName);
        case 'contactus':
            return generateContactUsTemplate(context);
        default:
            throw new Error('Invalid email type');
    }
};

module.exports = { getEmailTemplate };
