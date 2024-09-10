const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const productController = require('../controllers/productController');
const { authenticate } = require('../middlewares/authMiddleware');
router.get('/', authenticate, productController.getAllProducts);
router.get('/:id', authenticate, productController.getProductById);
router.post('/create', upload.single('image'), authenticate, productController.createProduct);
router.put('/:id', upload.single('image'), authenticate, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
