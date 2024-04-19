const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
app.use(cors());
app.use(express.json());
//NB: changes in the localhost doesn't affect the docker container:




  //manage all the urls that begin with /admin with the /routes/admin file:
const adminRouter =require("./routes/admin")
app.use("/admin",adminRouter)

//manage all the urls that begin with /salle with the /routes/salle file:
const salleRouter =require("./routes/salle")
app.use("/salle",salleRouter)

//manage all the urls that begin with /club with the /routes/club file:
const clubRouter =require("./routes/club")
app.use("/club",clubRouter)


//manage all the urls that begin with /reservation with the /routes/reservation file:
const reservationRouter =require("./routes/reservation")
app.use("/reservation",reservationRouter)



app.listen(5000,()=>{
    console.log("server runinig on port 5000");
});
