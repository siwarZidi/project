const express = require('express');
const { getsalles, addsalle, deletesalle, updatesalles } = require('../controllers/salleController');
const router = express.Router();

router.route("/get").get(getsalles);
router.route("/post").post(addsalle);
router.route("/delete/:num").delete(deletesalle);
router.route("/update/:num").put(updatesalles);

module.exports = router; 
