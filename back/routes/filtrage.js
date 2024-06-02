const express = require('express');
const router = express.Router();
const {filtrage} = require('../controllers/filtrageController');


router.route("/filtrage").get(filtrage);

module.exports = router; 
