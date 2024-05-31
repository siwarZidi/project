const mongoose=require('mongoose');
const reservationSchema=new mongoose.Schema({
  reservation_id: { type: Number, auto: true },
    num_reservation:{type:Number,unique:true},
    clubname:String,
    num_salle: Number,
    date: Date,
    starttime: String,
    endtime:String,
    stat:Boolean
});
const Reservation=mongoose.model("Reservation",reservationSchema);
module.exports =Reservation;


