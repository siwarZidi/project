const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json());
//NB: changes in the localhost doesn't affect the docker container:

//routes for the user:
app.get("/",(req,res)=>{
  res.send("hello world!!")
})
//create a club:done
app.post("/club",async(req,res)=>{
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
app.post("/login", async (req, res) => {
    
    try {
      const { email, password } = req.body;
      const query = "SELECT * FROM club WHERE email = $1 AND password = $2";
      const { rows } = await pool.query(query, [email, password]);
      if (rows.length > 0) {
        res.status(200).json({ message: "Login successful" });
        
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  //Make a reservation: done (si la salle est reservée à cette date , un message d'erreur s'affiche)
app.post("/reservation",async(req,res)=>{
  try{
    const {clubname,num_salle,date}=req.body;
    q1='select * from reservation where num_salle=$1 and date=$2';
    const rslt=await pool.query(q1,[num_salle,date]);
    if (rslt.rowCount===0){
      sqlquery='INSERT INTO reservation (clubname,num_salle,date) VALUES ($1,$2,$3)';
      const result=await pool.query(sqlquery,[clubname,num_salle,date]);
      res.status(200).send("reservation added successfully");

    }else {
      res.send("salle non disponible à cette date");
    }
  }catch(error){
    console.error("Error:",error);
    res.status(500).json({message:"Internal Server Error"});
}});
   //cancel a reservation:done:(NB:dans la page du club devant chaque reser existe un bouton qui va etre dirigé vers cet url avec l'id)
   app.delete("/reservation/:id",async(req,res)=>{
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
   //update reservation: à verifier:
   app.put("/reservation/:id",async(req,res)=>{
    try{
      const reservation_id=req.params.id * 1;
      const {num_salle,date}=req.body;
      q1='select * from reservation where num_salle=$1 and date=$2';
      const rslt=await pool.query(q1,[num_salle,date]);
      if (rslt.rowCount === 0){
      sqlquery='UPDATE reservation SET num_salle=$1 and date=$2 WHERE reservation_id=$3';
      const result=await pool.query(sqlquery,[num_salle,date,reservation_id]);
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


   })




  //manage all the urls that begin with /admin with the /routes/admin file:
const adminRouter =require("./routes/admin")
app.use("/admin",adminRouter)

app.listen(5000,()=>{
    console.log("server runinig on port 5000");
});
