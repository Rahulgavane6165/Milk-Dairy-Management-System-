const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products'); // Directory to save images
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using timestamp and file extension
        const filename = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;
