const expressAsyncHandler = require('express-async-handler');


const Reservation = require('../models/reservation');
const Club = require('../models/club');



const getreservation= expressAsyncHandler(async(req,res)=>{
  try {
    const allReservations =  await Reservation.find()
     
    console.log(allReservations)
    
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
              { $and: [{ starttime: { $lte: starttime } }, { endtime: { $gte: starttime } }] },
              { $and: [{ starttime: { $lte: endtime } }, { endtime: { $gte: endtime } }] },
              { $and: [{ starttime: { $gte: starttime } }, { endtime: { $lte: endtime } }] }
          ]
      });

      if (existingReservation) {
          res.status(400).send("La salle n'est pas disponible à cette date et heure.");
          return;
      }

      else{
        const newReservation = await Reservation.create(req.body);
        res.status(200).send("Réservation ajoutée avec succès.");
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

})

 module.exports={getreservation,makereservation,cancelreservation,updatereservation,findResByClub}









