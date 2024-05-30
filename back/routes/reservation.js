const express = require('express');
const router = express.Router();
const {getreservation, makereservation, cancelreservation,updatereservation,findResByClub}=require('../controllers/reservationController')


router.route("/get").get(getreservation);
router.route("/post").post(makereservation);
router.route("/delete/:num").delete(cancelreservation);
router.route("/update/:num").put(updatereservation);
router.route("/getByClub/:num").get(findResByClub);

module.exports = router; 
