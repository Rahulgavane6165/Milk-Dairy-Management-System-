const express = require('express');
const router = express.Router();
const milkPriceController = require('../controllers/milkpriceController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', authenticate, milkPriceController.getAllMilkPrices);
router.get('/:id', authenticate, milkPriceController.getMilkPriceById);
router.get('/fat/:fat', authenticate, milkPriceController.getMilkPriceByFatId);
router.post('/create', authenticate, milkPriceController.createMilkPrice);
router.put('/:id', authenticate, milkPriceController.updateMilkPriceById);
router.delete('/:id', authenticate, milkPriceController.deleteMilkPriceById);

module.exports = router;
