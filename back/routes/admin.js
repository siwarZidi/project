const express = require('express');
const pool = require('../db')
const router = express.Router();

//MANAGE ROOMS:

//get salle:(afficher la table salles): done
router.get("/salle",async(req,res)=>{
    const sqlquery='SELECT * FROM salles';
    try{
      const data = await pool.query(sqlquery);
      res.status(200).json(data.rows);
  }catch (err){
      console.error(err.message);
}});


//ajouter une salle (admin):done
router.post("/salle",async (req,res)=>{
    const sqlquery='INSERT INTO salles (num_salle, nbre_place) VALUES ($1,$2) RETURNING *'
    try{
      const {num_salle, nbre_place } = req.body;
      const result = await pool.query(sqlquery,[num_salle, nbre_place]);
      res.json(result.rows[0]);
  }catch (err){
      console.error(err.message);
  
  }});

//supprimer une salle: done
router.delete("/salle/:id",async(req,res)=>{
    id= parseInt(req.params.id,10);
    sqlquery='DELETE FROM salles WHERE num_salle=$1';
    try{
        const result= await pool.query(sqlquery,[id]);
        if (result.rowCount === 1) {  //rowcount: nbre of rows affected by the query.
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false, error: 'Salle not found.' });
    } 
    }catch (error){
        console.log(error);
        res.status(500).send({success:false,error:'delete failed. '});
    }}); 
 
//update une salle: done (NB: les parametres $1 et $2... doivent etre avec les meme appelation que les colonnes dans la base)
router.put("/salle/:id",async(req,res)=>{
    
    try{
        num_salle=req.params.id*1;
        const {nbre_place} = req.body; 
        sqlquery='UPDATE salles SET nbre_place=$1 where num_salle=$2';
        const result= await pool.query(sqlquery,[nbre_place,num_salle]);
        if(result.rowCount === 1){
            res.status(200).send({result:"salle found",msg:"updated successfully"});
        }else{
            res.status(404).send('salle not found');
        }
        }catch(error){
            console.error(error);
            res.status(500).send('update failed');
        }

});

//MANAGE CLUBS:

//get a club:done
router.get("/club",async(req,res)=>{
    const sqlquery='SELECT * FROM club';
    try{
      const data = await pool.query(sqlquery);
      res.status(200).json(data.rows);
  }catch (err){
      console.error(err.message);
}});
   
//supprimer un club:(dynamic id : use the id entred in the url) :done
router.delete("/club/:id",async(req,res)=>{
    const name = req.params.id;

    const sqlquery= 'DELETE FROM club WHERE name=$1';
    try{
        await pool.query(sqlquery,[name]);
        res.status(200).send({ success:true});
    }catch (error){
        console.log(error);
        res.status(500).send({success: false, error:'delete failed.'});
    }});

//ajouter un club:done
router.post("/club",async(req,res)=>{
    try{
        const {name, year, email , password} = req.body;
        const newClub = await pool.query("INSERT INTO club (name, year, email , password) VALUES ($1,$2,$3,$4) RETURNING *",
        [name, year, email , password]
        );
        res.json(newClub.rows[0]);
    }catch (err){
        console.error(err.message);

    }
});

//update un club:
router.put("/club/:id",async(req,res)=>{
    try{
        const name=req.params.id * 1;
        const {year,email,password}=req.body;
        sqlquery='UPDATE club SET year=$1 and email=$2 and password=$3 WHERE name=$4';
        const result= await pool.query(sqlquery,[year,email,password,name]);
        if(result.rowCount === 1){
            res.status(200).send({result:"club found",msg:"updated successfully"});
        }else{
            res.status(404).send('club not found');
        }
        }catch(error){
            console.error(error);
            res.status(500).send('update failed');
        }


})

       
    


//MANAGE RESERVATIONS:

//access the same urls as the user for the reservation crud.

  
module.exports = router; 