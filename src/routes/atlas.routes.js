const express = require('express');
const router = express.Router();
const atlasController = require('../controllers/atlas.controller.js');
router.get('/atlas', atlasController.getResponse);
router.post('/atlas', atlasController.postResponse);
module.exports = router;