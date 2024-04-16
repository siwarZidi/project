const express = require('express');
const pool = require('../db')
const router = express.Router();



//register:done
router.post("/register",async(req,res)=>{
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
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });




  
//get a club:done
router.get("/get",async(req,res)=>{
    const sqlquery='SELECT * FROM club';
    try{
      const data = await pool.query(sqlquery);
      res.status(200).json(data.rows);
  }catch (err){
      console.error(err.message);
}});
   
//supprimer un club:(dynamic id : use the id entred in the url) :done
router.delete("/delete/:id",async(req,res)=>{
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
router.post("/post",async(req,res)=>{
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
router.put("/update/:id",async(req,res)=>{
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
  module.exports = router; 