const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json());
//Routes//


//create a club
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
//login
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
  //Make a reservation
  app.post("/reservation", async (req, res) => {
    
    try {
      const { clubname,classname, date,time } = req.body;
      const query = "SELECT * FROM reservation WHERE classname = $1 AND date = $2 AND time=$3 RETURNING *";
      const { rows } = await pool.query(query, [classname, date,time]);
      if (rows.length > 0) {
        res.status(401).json({ message: "Reservation failed" });
        
      } else {
        const newReservation = await pool.query("INSERT INTO reservation (clubname,classname, date,time) VALUES ($1,$2,$3,$4) ",[clubname,classname, date,time]);
        res.status(200).json({ message: "Reservation succ" });
        res.json(newReservation.rows[0]);
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
app.listen(5000,()=>{
    console.log("server runinig on port 5000");
});