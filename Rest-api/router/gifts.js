const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { giftController } = require('../controllers')

// middleware that is specific to this router

router.get('/home', giftController.getLatestsGifts);
router.get('/', giftController.getAllGifts);
router.post('/', auth(), giftController.createGift);
router.get('/details/:giftId', giftController.getGiftbyId);
router.delete('/:giftId/delete', auth(), giftController.deleteGift);
router.put('/:giftId/edit', auth(), giftController.editGift);
router.post('/:giftId/like', auth(), giftController.like);
router.put('/:giftId/buy', auth(), giftController.buy);


module.exports = router