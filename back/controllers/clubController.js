const expressAsyncHandler = require('express-async-handler');
const club = require('../models/club');

const getclubs= expressAsyncHandler(async(req,res)=>{
   try {
   
     const allClubs = await club.find();
     res.json(allClubs);
   } catch (err) {
     console.error(err.message);
     res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des clubs.' });
   }
 });
 
 const getclub = expressAsyncHandler(async(req,res)=>{
    try{
        const num=req.params.num;
        const clubb = await club.findOne({clubNum:num});
        res.status(200).json(clubb);
     }catch (err){
       console.error(err.message);
 }});

 const addclub=expressAsyncHandler(async(req,res)=>{
   try{
    const nameClub=req.body.name
      const existClub=await club.findOne({name:nameClub});
      if(existClub){
         res.status(400).send('Club already exists');
      }
      else{
         const clubb=await club.create(req.body);
         res.status(200).send('club added');
      }
    }
      catch{
         (err)=>{
            console.error(err.message);
      } 
      }
 });

 const deletclub=expressAsyncHandler(async(req,res)=>{
   try{
 num=req.params.num;
const deletedClub=await club.findOneAndDelete({clubNum:num});
 if (!deletedClub){
   res.send("club not found");
 }else {
   res.send("deleted successfully");
 }}catch(err){
   console.error("Error",err);
   res.status(500).json({message:"Internal Server Error"});
 }    
});
const getdatabyname = expressAsyncHandler(async (req, res) => {
  try {
    const name = req.params.name;
    const clubb = await club.findOne({ name: name });
    if (clubb) {
      res.status(200).json(clubb);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du club par nom.' });
  }
});

const getdatabyemail = expressAsyncHandler(async (req, res) => {
  try {
    const email = req.params.email;
    const clubb = await club.findOne({ email: email });
    if (clubb) {
      res.status(200).json(clubb);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du club par nom.' });
  }
});


const updateclub = expressAsyncHandler(async(req,res)=>{
  try { 
      const num = req.params.num;
      const { name,year,email,password} = req.body;
      const currentClub = await club.findOneAndUpdate({clubNum:num},{ name,year,email,password});
      if(currentClub){
      res.status(200).send({ result: "Club found", msg: "Updated successfully" });
    }
      else{
        res.status(404).send('Club not found');
      }
  } 
  catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      res.status(500).send('Update failed');
  }
});
module.exports={getclub,getclubs,addclub,deletclub,updateclub,getdatabyname,getdatabyemail}




