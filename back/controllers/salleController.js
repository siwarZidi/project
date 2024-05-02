const expressAsyncHandler = require('express-async-handler');
const salle=require('../models/salle')

const getsalles= expressAsyncHandler(async(req,res)=>{
    try {
    
      const allSalles = await salle.find();
      res.json(allSalles);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des réservations.' });
    }
  });
const addsalle = expressAsyncHandler(async(req,res)=>{
    try{
        const {num}=req.body;
       const existingSalle=await salle.findOne({num_salle:num});
       if(existingSalle){
        res.status(400).send("la salle existe deja dans la base");
       }
      else {
       const newSalle=salle.create(req.body);
       res.status(200).send('salle ajoutée');
      }
    }catch (err){
        console.error(err.message);
    
    }
});

const deletesalle=expressAsyncHandler(async(req,res)=>{
      try{
    num=req.params.num;
   const deletedSalle=await salle.findOneAndDelete({num_salle:num});
    if (!deletedSalle){
      res.send("salle n'existe pas deja");
    }else {
      res.send("deleted successfully");
    }}catch(err){
      console.error("Error",err);
      res.status(500).json({message:"Internal Server Error"});
    }    
});



const updatesalles = expressAsyncHandler(async(req,res)=>{
    try { 
        const num = req.params.num;
        const newSalle= req.body;
        const currentSalle = await salle.findOneAndUpdate({num_salle:num},newSalle);
       if(currentSalle){
        res.status(200).send({ result: "Salle found", msg: "Updated successfully" });
       } 
       else{
        res.status(404).send('salle not found');
       }
  }
    catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        res.status(500).send('Update failed');
    }
});

module.exports= {deletesalle,getsalles,addsalle,updatesalles}