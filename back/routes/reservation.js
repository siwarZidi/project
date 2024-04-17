const express = require('express');
const pool = require('../db')
const router = express.Router();

//get all reservation: done
router.get("/get",async(req,res)=>{
  try{
      const {clubname,num_salle,date,starttime,endtime} = req.body;
      const allReservations = await pool.query("SELECT * FROM reservation");
      res.json(allReservations.rows)
      
  }catch (err){
      console.error(err.message);
  }
});

 //Make a reservation: done (si la salle est reservée à cette date , un message d'erreur s'affiche)
 router.post("/make",async(req,res)=>{
    try{
      const {clubname,num_salle,date,starttime,endtime}=req.body;
      const resultat=await pool.query('select * from reservation');
      if (resultat.rowCount === 0){
        sqlquery='INSERT INTO reservationdemande (clubname,num_salle,date,starttime,endtime) VALUES ($1,$2,$3,$4,$5)';
        const result=await pool.query(sqlquery,[clubname,num_salle,date,starttime,endtime]);
        res.status(200).send("reservation added successfully");
      }else{
      q1='select * from reservationdemande where num_salle=$1 and date=$2 and endtime > $3 and starttime < $4';
      const rslt=await pool.query(q1,[num_salle,date,starttime,endtime]);
      if (rslt.rowCount===0){
        sqlquery='INSERT INTO reservationdemande (clubname,num_salle,date,starttime,endtime) VALUES ($1,$2,$3,$4,$5)';
        const result=await pool.query(sqlquery,[clubname,num_salle,date,starttime,endtime]);
        res.status(200).send("reservation added successfully");
  
      }else {
        res.send("salle non disponible à cette date");
      }}
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
router.put("/update/:id",async(req,res)=>{
  try{
    const reservation_id=req.params.id ; 
    const {num_salle,date,starttime,endtime}=req.body;
    const rslt1=await pool.query('select * from reservation where reservation_id=$1',[reservation_id]);
    q1='select * from reservation where  date=$1 and endtime > $2 and starttime < $3';
    const rslt2=await pool.query(q1,[date,starttime,endtime]);
    if (rslt1.rowCount > 0 && rslt2.rowCount === 0){
    sqlquery='UPDATE reservation SET num_salle=$1, date=$2, starttime=$3, endtime=$4 WHERE reservation_id=$5 ';
    const result=await pool.query(sqlquery,[num_salle, date, starttime, endtime,reservation_id]);
        if(result.rowCount === 1){
          res.status(200).send({result:"reservation found",msg:"updated successfully"});
        }else{
          res.status(404).send('reservation not found');
        }
    }else {
    res.send("salle non disponible à cette date");
  }
}catch(error){
        console.error(error);
        res.status(500).send('update failed');
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
