const expressAsyncHandler = require('express-async-handler');
const pool = require("../db");

const club = require('../models/club');


const getclub = expressAsyncHandler(async(req,res)=>{

    const sqlquery='SELECT * FROM club';
    try{
      const data = await pool.query(sqlquery);
      res.status(200).json(data.rows);
  }catch (err){
      console.error(err.message);
}});

const deleteclub = expressAsyncHandler(async(req,res)=>{
    try{
        const {name}=req.body;
        const sqlquery= 'DELETE FROM club WHERE name=$1';
        const resultat=await pool.query("SELECT * FROM club WHERE name=$1",[name]);
        if (resultat.rowCount > 0){
            await pool.query(sqlquery,[name]);
            res.status(200).send({ success:true});
        }else{
            res.send("le club n'existe pas déjà");
        }
    }catch (error){
        console.log(error);
        res.status(500).send({success: false, error:'delete failed.'});
    }});

const updateclub=expressAsyncHandler(async(req,res)=>{
    try{
        const id=req.params.id;
        const {year,email,password}=req.body;
        sqlquery='UPDATE club SET year=$1 and email=$2 and password=$3 WHERE club_id=$4';
        const result= await pool.query(sqlquery,[year,email,password,club_id]);
        if(result.rowCount === 1){
            res.status(200).send({result:"club found",msg:"updated successfully"});
        }else{
            res.status(404).send('club not found');
        }
        }catch(error){
            console.error(error);
            res.status(500).send('update failed');
        }});


module.exports={getclub,deleteclub,updateclub}




