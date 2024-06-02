const express = require('express');
const app = express();
const cors = require("cors");
const  mongoose=require('mongoose')
const bodyParser=require('body-parser');
//sessions:
const session=require('express-session')
const cookieParser =require('cookie-parser');
const sessionSecret = process.env.SESSION_SECRET || 'Secret_session_key';

const sessionConfig = {
    secret: sessionSecret,
    resave: false, 
    saveUninitialized: true, 
    cookie: {
      secure: true, 
      httpOnly: true, 
      maxAge: 1000 * 60 * 60,
    }
  };
app.use(session(sessionConfig));
///


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://arij:arij123@cluster0.g2wtx8e.mongodb.net/PPP')

//manage all the urls that begin with /reservation with the /routes/reservation file:
 const reservationRouter =require("./routes/reservation");
 app.use("/reservation",reservationRouter);

 const salleRouter =require("./routes/salle");
 app.use("/salle",salleRouter);

 const clubRouter =require("./routes/club");
 app.use("/club",clubRouter);

 const registerRouter= require("./routes/register");
 app.use("/registration",registerRouter);
 
const loginRouter= require("./routes/login");
app.use("/",loginRouter);

const filtrageRouter=require("./routes/filtrage");
app.use("/",filtrageRouter);




app.listen(5000,()=>{
    console.log("server runinig on port 5000");
});

