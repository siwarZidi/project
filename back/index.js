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

//sessions:
const session=require('express-session')
const cookieParser =require('cookie-parser');
const sessionSecret = process.env.SESSION_SECRET || 'Secret_session_key';

const sessionConfig = {
    secret: sessionSecret,
    resave: false, // Don't resave sessions that haven't changed
    saveUninitialized: true, // Save new sessions even if not initialized
    cookie: {
      secure: true, // Set to `false` only for development (HTTPS is crucial)
      httpOnly: true, // Prevent client-side JavaScript access to the cookie
      maxAge: 1000 * 60 * 60, // One hour in milliseconds (customize expiration)
    }
  };
app.use(session(sessionConfig));
///

app.use(cors());
app.use(express.json());

//mongoose.connect('mongodb://localhost:27017/ppp')

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

