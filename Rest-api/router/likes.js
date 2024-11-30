const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { giftController } = require('../controllers');

// middleware that is specific to this router

router.put('/:giftId', auth(), giftController.like);

module.exports = router
