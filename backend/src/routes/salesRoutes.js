const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', authenticate, salesController.getAllSales);
router.get('/:id', authenticate, salesController.getSaleById);
router.get('/user/:user_id', authenticate, salesController.getSaleByUserId);
router.post('/create', authenticate, salesController.createSale);
router.put('/:id', authenticate, salesController.updateSale);
router.delete('/:id', authenticate, salesController.deleteSale);

module.exports = router;
