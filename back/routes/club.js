const express = require('express');
const pool = require('../db')
const router = express.Router();
const { getclub } = require('../controllers/clubController');



//register:done
router.post("/register",async(req,res)=>{
    try{
        const {name, year, email , password} = req.body;
        const resultat=await pool.query("SELECT * FROM club WHERE name=$1",[name]);
        if (resultat.rowCount === 0){
        const newClub = await pool.query("INSERT INTO club (name, year, email , password) VALUES ($1,$2,$3,$4) RETURNING *",
        [name, year, email , password]
        );
        res.json(newClub.rows[0]);
    }else {
        res.send("le club existe deja")
    }
    }catch (err){
        console.error(err.message);

    }
});   

//login:done
router.post("/login", async (req, res) => {
    
    try {
      const { email, password } = req.body;
      const query = "SELECT * FROM club WHERE email = $1 AND password = $2";
      const { rows } = await pool.query(query, [email, password]);
      if (rows.length > 0) {
        res.status(200).json({ message: "Login successful" });
        
      } else {
        res.status(401).json({message: "Login failed" });
      }
    } catch (error) {
      console.error("Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  
//get a club:done
router.route("/get").get(getclub);
   
//supprimer un club:done
router.delete("/delete",async(req,res)=>{
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

//update un club: à verifier 
router.put("/update/:id",async(req,res)=>{
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
        }
});
  module.exports = router; 