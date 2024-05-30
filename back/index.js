const express = require('express');
const app = express();
const cors = require("cors");
const  mongoose=require('mongoose')
const {endpoint} = require('./config');

//const dotenv = require('dotenv');
//dotenv.config();
mongoose.connect(endpoint).then(()=>{
    console.log("Database connected")
})

app.use(cors());
app.use(express.json());

//mongoose.connect('mongodb://localhost:27017/ppp')

// //manage all the urls that begin with /reservation with the /routes/reservation file:
const reservationRouter =require("./routes/reservation");
 app.use("/reservation",reservationRouter);

 const salleRouter =require("./routes/salle");
 app.use("/salle",salleRouter);

 const clubRouter =require("./routes/club");
 app.use("/club",clubRouter);

app.listen(5000,()=>{
    console.log("server runinig on port 5000");
});
