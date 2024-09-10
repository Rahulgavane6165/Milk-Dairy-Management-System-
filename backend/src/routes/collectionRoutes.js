const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', authenticate, collectionController.getAllCollections);
router.get('/user/:user_id', authenticate, collectionController.getCollectionByUserId);
router.get('/:id', authenticate, collectionController.getCollectionById);
router.get('/date/:date', authenticate, collectionController.getCollectionsByDate);
router.post('/create', authenticate, collectionController.createCollection);
router.put('/:id', authenticate, collectionController.updateCollectionById);
router.delete('/:id', authenticate, collectionController.deleteCollectionById);

module.exports = router;
