const express = require('express');
const pool = require('../db')
const router = express.Router();



//filtrer les reservations par date:
router.get("/filtrer_date",async(req,res)=>{
    try{
        const {clubname,num_salle,date,starttime,endtime} = req.body;
        const allReservations = await pool.query("SELECT * FROM reservation WHERE date=$1",[d1]);
        res.json(allReservations.rows)
        
    }catch (err){
        console.error(err.message);
    }
});

module.exports = router; 
