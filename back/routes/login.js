const express= require('express');
const router=express.Router();

const { login , whoisloggedin }=require('../controllers/loginController');

router.route('/login').post(login);
//router.route('/whoisloggedin').post(whoisloggedin);
//router.get('/logout').post(logout);

module.exports=router;