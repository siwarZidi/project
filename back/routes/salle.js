const express = require('express');
const pool = require('../db')
const router = express.Router();

//acces pour l'admin seulement:

//get salle:(afficher la table salles): done
router.get("/get",async(req,res)=>{
    const sqlquery='SELECT * FROM salles';
    try{
      const data = await pool.query(sqlquery);
      res.status(200).json(data.rows);
  }catch (err){
      console.error(err.message);
}});


//ajouter une salle (admin):done
router.post("/post",async (req,res)=>{
    try{
      const {num_salle, nbre_place } = req.body;
      query='SELECT * FROM salles WHERE num_salle=$1';
      const rslt=await pool.query(query,[num_salle]);
      if (rslt.rowCount===0){
        const sqlquery='INSERT INTO salles (num_salle, nbre_place) VALUES ($1,$2) RETURNING *';
        const result = await pool.query(sqlquery,[num_salle, nbre_place]);
        res.json(result.rows[0]);
    }else {
        res.send("la salle existe deja dans la base");
    }
  }catch (err){
      console.error(err.message);
  
  }});

//supprimer une salle: done
router.delete("/delete/:id",async(req,res)=>{
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
router.put("/update/:id",async(req,res)=>{
    
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

module.exports = router; 
