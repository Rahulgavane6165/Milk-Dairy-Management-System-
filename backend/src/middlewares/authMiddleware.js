const jwt = require('jsonwebtoken');

const { verifyToken } = require('../utils/jwtUtils');

exports.authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const user = await verifyToken(token);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token is invalid or expired' });
    }
};
