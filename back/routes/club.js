const express = require('express');
const { getclubs, getclub, addclub, deletclub, updateclub } = require('../controllers/clubController');
const router = express.Router();


router.route("/get").get(getclubs);
router.route("/getClub/:num").get(getclub);
router.route("/post").post(addclub);
router.route("/delete/:num").delete(deletclub);
router.route("/update/:num").put(updateclub);

module.exports = router; 
