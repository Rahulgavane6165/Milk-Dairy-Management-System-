const { User, ResetPassword } = require('../models');
const crypto = require('crypto');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const emailService = require('../services/emailService');

// Generate a password reset token
const generateResetToken = () => crypto.randomBytes(32).toString('hex');

// Request Password Reset
exports.requestReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = generateResetToken();
        const expiresAt = moment().add(1, 'hour').toDate();

        await ResetPassword.create({
            token,
            expiresAt,
            userId: user.id,
        });

        // Send reset link via email
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await emailService.sendEmail(email, 'Password Reset Request', 'resetPassword', { resetLink });
        console.log("email sent", resetLink)

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (error) {
        console.log("error================", error)
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Verify Reset Token
exports.verifyToken = async (req, res) => {
    try {
        const { token } = req.query;
        const resetRequest = await ResetPassword.findOne({
            where: { token },
            include: { model: User },
        });

        if (!resetRequest || moment().isAfter(resetRequest.expiresAt)) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        res.status(200).json({ message: 'Token is valid', user: resetRequest.User });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const resetRequest = await ResetPassword.findOne({
            where: { token },
            include: { model: User },
        });

        if (!resetRequest || moment().isAfter(resetRequest.expiresAt)) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const user = resetRequest.User;
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        await ResetPassword.destroy({ where: { token } }); // Cleanup used token

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
