const expressAsyncHandler = require('express-async-handler');
const {validateRegisterForm} =require('../validationduform/validationClub')
const club= require('../models/club')

const {hashpass}=require('../authentication/hashpassword');
const { response } = require('express');

const registration = expressAsyncHandler(async (req, res) => {
  try {

    validateRegisterForm(req.body).then(async (response) => {
    if (response.result) {
       
    const hashedPassword = await hashpass(req.body.password);

    
    const existingClub = await club.findOne({ name: req.body.name });
    console.log(existingClub);
    if (existingClub) {
      return res.status(400).json('Club already exists');
    }

    
    const newClub = new club({
      name: req.body.name,
      year: req.body.year, 
      email: req.body.email,
      password: hashedPassword,
      image:req.body.image
    });
    const createdClub = await newClub.save();

    
    res.status(201).json('Club created successfully!');
    }else{
        res.status(400).json(response.message);
        console.log('failed to add the club')
        
        //reload the register page 
        //res.redirect('/register');
    }

});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = { registration };

