const express= require('express');
const router=express.Router();

const { login }=require('../controllers/loginController');

router.route('/login').post(login);
//router.get('/logout').post(logout);

module.exports=router;