const mongoose=require('mongoose');
const reservationSchema=new mongoose.Schema({
  reservation_id: Number,
    clubname:String,
    num_salle: Number,
    date: Date,
    starttime: Date,
    endtime:Date,
    stat:Date
});
const reservation=mongoose.model("Reservation",reservationSchema);
module.exports =reservation;


