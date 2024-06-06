const expressAsyncHandler = require('express-async-handler');


const Reservation = require('../models/reservation');


// filtrage admin : 

const filtrage= expressAsyncHandler(async(req,res)=>{
const {clubname,num_salle,date,starttime,endtime,statu} = req.body;
console.log(req.body);
const filterQuery = {};
try {
    if(clubname){
        filterQuery.clubname=clubname;
    }
    if(date){
        filterQuery.date=date;
    }
    if(starttime){
        filterQuery.starttime=starttime;
    }
    if(endtime){
        filterQuery.endtime=endtime;
    }
    if(num_salle){
        filterQuery.num_salle=num_salle;
    }
    if(statu){
        filterQuery.statu=statu;
    }
    
    const reservationfiltre=await Reservation.find(filterQuery);
    res.status(200).json(reservationfiltre);  
}catch(error){
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
}
});

module.exports= {filtrage}