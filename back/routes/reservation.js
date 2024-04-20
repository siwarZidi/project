const express = require('express');
const pool = require('../db')
const router = express.Router();

//get all reservation: done
router.get("/get",async(req,res)=>{
  try{
     
      const allReservations = await pool.query("SELECT * FROM reservation");
      res.json(allReservations.rows)
      
  }catch (err){
      console.error(err.message);
  }
});
router.get("/gett",async(req,res)=>{
  try{
      const reservationId = "17";
      const Reservation = await pool.query("SELECT * FROM reservation where reservation_id =$1" ,[reservationId]);
      res.json(Reservation.rows)
      
  }catch (err){
      console.error(err.message);
  }
});

 //Make a reservation: done (si la salle est reservée à cette date , un message d'erreur s'affiche)
 router.post("/make",async(req,res)=>{
    try{
      const {clubname,roomname,date,starttime,endtime}=req.body;
      const resultat=await pool.query('select * from reservation where roomname=$1 AND date=$2 AND starttime=$3 AND endtime=$4',[roomname,date,starttime,endtime]); 
      if (resultat.rowCount === 0){
        sqlquery='INSERT INTO reservation (roomname,date,starttime,endtime,clubname) VALUES ($1,$2,$3,$4,$5)';
        const result=await pool.query(sqlquery,[roomname,date,starttime,endtime,clubname]);
        res.status(200).send("reservation added successfully");
      }else {
        res.send("salle non disponible à cette date");
      }
    }catch(error){
      console.error("Error:",error);
      res.status(500).json({message:"Internal Server Error"});
  }});
//cancel a reservation:done:(NB:dans la page du club devant chaque reser existe un bouton qui va etre dirigé vers cet url avec l'id)
router.delete("/cancel/:id",async(req,res)=>{
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
  
  //update reservation:à vérifier
  router.put("/update/:id", async (req, res) => {
    try {
        const reservationId = req.params.id;
        const { roomname, date, starttime, endtime } = req.body;

        // Récupérer les données actuelles de la réservation
        const currentReservation = await pool.query('SELECT * FROM reservation WHERE reservation_id = $1', [reservationId]);
        const currentData = currentReservation.rows[0];

        // Créer un objet avec les champs mis à jour
        const updatedData = {
            roomname: roomname || currentData.roomname,
            date: date || currentData.date,
            starttime: starttime || currentData.starttime,
            endtime: endtime || currentData.endtime
        };

        // Mettre à jour la réservation
        const updateQuery = `
            UPDATE reservation 
            SET roomname = $1, date = $2, starttime = $3, endtime = $4 
            WHERE reservation_id = $5
        `;
        await pool.query(updateQuery, [updatedData.roomname, updatedData.date, updatedData.starttime, updatedData.endtime, reservationId]);

        // Répondre avec un message de succès
        res.status(200).send({ result: "Reservation found", msg: "Updated successfully" });
    } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
        res.status(500).send('Update failed');
    }
});

  
  
  
//accept reservation by the admin :
router.post("/accept", async(req,res)=>{
try{
    const {num_salle,date,starttime,endtime}=req.body;
    query='INSERT INTO reservation (clubname,num_salle,date,starttime,endtime) VALUES ($1,$2,$3,$4,$5)';
    const result=await pool.query(query,[clubname,num_salle,date,starttime,endtime]);
}catch(err){
    console.error("Error",err);
    res.status(500).json({message:"Internal Server Error"});
  }
});



 module.exports = router; 
