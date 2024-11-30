const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { giftController } = require('../controllers')

// middleware that is specific to this router

router.get('/', giftController.getLatestsGifts);
router.get('/catalog', giftController.getAllGifts);
router.get('/:giftId', giftController.getGiftbyId);
router.post('/:giftId', auth(), giftController.createGift);
router.delete('/:giftId/delete', auth(), giftController.deleteGift);
router.put('/:giftId/edit', auth(), giftController.editGift)


module.exports = router