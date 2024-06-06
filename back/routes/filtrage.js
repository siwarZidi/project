const express = require('express');
const {filtrage} = require('../controllers/filtrageController');
const router = express.Router();

router.route("/filtrage").post(filtrage);

module.exports = router; 
