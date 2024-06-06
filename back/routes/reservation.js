const express = require('express');
const router = express.Router();
const {getreservation, makereservation, cancelreservation,updatereservation,findResByClub,acceptreservation,declinereservation}=require('../controllers/reservationController');


router.route("/get").get(getreservation);
router.route("/post").post(makereservation);
router.route("/delete/:num").delete(cancelreservation);
router.route("/update/:num").put(updatereservation);
router.route("/getByClub/:name").get(findResByClub);
router.route("/accept/:num").put(acceptreservation);
router.route("/decline/:num").put(declinereservation);

module.exports = router; 

