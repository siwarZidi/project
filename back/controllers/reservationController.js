const expressAsyncHandler = require('express-async-handler');


const Reservation = require('../models/reservation');
const Club = require('../models/club');
const Stat =require('../models/stat');


const getreservation= expressAsyncHandler(async(req,res)=>{
  try {
    const allReservations =  await Reservation.find()
    
    return res.json( allReservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des réservations.' });
  }
});

const makereservation = expressAsyncHandler(async (req, res) => {
  try {
      const { clubname, num_salle, date, starttime, endtime, trainer, workShopName, description } = req.body;


      // Vérifier si la salle est disponible pour la date et l'heure spécifiées
      const existingReservation = await Reservation.findOne({
        clubname: clubname,  
        num_salle: num_salle,
        trainer: trainer,
        workShopName: workShopName,
        description: description,
        statu : "pending",
          date: date,
          $or: [
            { $and: [{ starttime: { $lte: starttime} }, { endtime: { $gt: starttime } }] }, // Overlaps at starttime
            { $and: [{ starttime: { $lt: endtime } }, { endtime: { $gt: endtime } }] }, // Overlaps at endtime
            { $and: [{ starttime: { $gte: starttime } }, { endtime: { $lte: endtime } }] }
          ]
      });
      console.log(existingReservation);

      if (existingReservation) {
          res.status(400).send("La salle n'est pas disponible à cette date et heure.");
          return;
      }

      else{
        const newReservation = await Reservation.create(req.body);
        res.status(200).json({ message: "Réservation ajoutée avec succès.", clubname: newReservation.clubname });
      }
     }
   catch (error) {
      console.error("Erreur:", error);
      res.status(500).json({ message: "Erreur interne du serveur." });
   }
});


const cancelreservation = expressAsyncHandler(async(req,res)=>{
    try{
        num=req.params.num;
        const deletedReservation=await Reservation.findOneAndDelete({num_reservation:num});
        if (!deletedReservation){
          res.send("reservation n'existe pas deja");
        }else {
          res.send("deleted successfully");
        }}catch(err){
          console.error("Error",err);
          res.status(500).json({message:"Internal Server Error"});
        }    
});

const updatereservation=expressAsyncHandler(async(req,res)=>{
    try { 
        const num = req.params.num;
        const { clubname,num_salle,date,starttime,endtime,trainer,workShopName } = req.body;
        const currentReservation = await Reservation.findOneAndUpdate({num_reservation:num},{ clubname,num_salle, date, starttime, endtime, trainer,workShopName })
        if(currentReservation){
        res.status(200).send({ result: "Reservation found", msg: "Updated successfully" });}
        else{
          res.status(404).send('Reservation not found');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        res.status(500).send('Update failed');
    }
});

const findResByClub=expressAsyncHandler(async(req,res)=>{
    try{
      const name=req.params.name;
      const reservations=await Reservation.find({clubname:name})
      res.json(reservations);
    }
    catch(err){
        console.log(err);
        res.status(404).send('Club Not Found');
    }

});
const acceptreservation = expressAsyncHandler(async(req,res)=>{
  
  try{
    const num=req.params.num;
    const reservation= await Reservation.findOneAndUpdate({num_reservation:num},{statu:'accepted'});

}catch(err){
  console.log(err);
  res.status(404).send('reservation not found and update failed');
}
});

const declinereservation = expressAsyncHandler(async(req,res)=>{
  
  try{
    const num=req.params.num;
    const reservation= await Reservation.findOneAndUpdate({num_reservation:num},{statu:'rejected'});

}catch(err){
  console.log(err);
  res.status(404).send('reservation not found and update failed');
}
});

 module.exports={getreservation,makereservation,cancelreservation,updatereservation,findResByClub,acceptreservation,declinereservation}









