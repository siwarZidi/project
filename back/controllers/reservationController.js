const expressAsyncHandler = require('express-async-handler');
const pool = require("../db");

const reservation = require('../models/reservation');
//const reservationdemande = require('../models/reservationdemande');


const getreservation= expressAsyncHandler(async(req,res)=>{
  try {
    // Utilisation du modèle Sequelize pour récupérer toutes les réservations
    const allReservations = await reservation.findOne({ where: { reservation_id: 21 } });
    res.json(allReservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des réservations.' });
  }
});

const makereservation = expressAsyncHandler(async(req,res)=>
{
    try{
        const {clubname,num_salle,date,starttime,endtime}=req.body;
        const resultat=await pool.query('select * from reservation');
        if (resultat.rowCount === 0){
          sqlquery='INSERT INTO reservation (clubname,num_salle,date,starttime,endtime) VALUES ($1,$2,$3,$4,$5)';
          const result=await pool.query(sqlquery,[clubname,num_salle,date,starttime,endtime]);
          res.status(200).send("reservation added successfully");
        }else{
        q1='select * from reservation where num_salle=$1 and date=$2 and endtime > $3 and starttime < $4';
        const rslt=await pool.query(q1,[num_salle,date,starttime,endtime]);
        if (rslt.rowCount===0){
          sqlquery='INSERT INTO reservation (clubname,num_salle,date,starttime,endtime) VALUES ($1,$2,$3,$4,$5)';
          const result=await pool.query(sqlquery,[clubname,num_salle,date,starttime,endtime]);
          res.status(200).send("reservation added successfully");
    
        }else {
          res.send("salle non disponible à cette date");
        }}
      }catch(error){
        console.error("Error:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
});

const cancelreservation = expressAsyncHandler(async(req,res)=>{
    try{
        id=req.params.id*1;
        sqlquery='DELETE FROM reservation WHERE reservation_id=$1';
        result=await pool.query(sqlquery,[id]);
        if (result.rowCount===0){
          res.send("reservation n'existe pas deja");
        }else {
          res.send("delete successfully");
        }}catch(err){
          console.error("Error",error);
          res.status(500).json({message:"Internal Server Error"});
        }    
});

const updatereservation=expressAsyncHandler(async(req,res)=>{
    try { 
        const reservationId = req.params.id;
        const { num_salle, date, starttime, endtime } = req.body;
  
        // Récupérer les données actuelles de la réservation
        const currentReservation = await pool.query('SELECT * FROM reservation WHERE reservation_id = $1', [reservationId]);
        const currentData = currentReservation.rows[0];
  
        // Créer un objet avec les champs mis à jour
        const updatedData = {
            num_salle: num_salle || currentData.num_salle,
            date: date || currentData.date,
            starttime: starttime || currentData.starttime,
            endtime: endtime || currentData.endtime
        };
  
        // Mettre à jour la réservation
        const updateQuery = `
            UPDATE reservation 
            SET num_salle = $1, date = $2, starttime = $3, endtime = $4 
            WHERE reservation_id = $5
        `;
        await pool.query(updateQuery, [updatedData.num_salle, updatedData.date, updatedData.starttime, updatedData.endtime, reservationId]);
  
        // Répondre avec un message de succès
        res.status(200).send({ result: "Reservation found", msg: "Updated successfully" });
    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        res.status(500).send('Update failed');
    }
});

const acceptreservation = expressAsyncHandler(async(req,res)=>{
    try{
        const {num_salle,date,starttime,endtime}=req.body;
        query='INSERT INTO reservation (clubname,num_salle,date,starttime,endtime) VALUES ($1,$2,$3,$4,$5)';
        const result=await pool.query(query,[clubname,num_salle,date,starttime,endtime]);
    }catch(err){
        console.error("Error",err);
        res.status(500).json({message:"Internal Server Error"});
    }
})

module.exports={makereservation,cancelreservation,getreservation,updatereservation}









