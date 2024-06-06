const express = require('express');
const router= express.Router();

const { registration }= require('../controllers/registerController');


router.route("/post").post(registration);

module.exports = router;

