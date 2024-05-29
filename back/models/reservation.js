const mongoose=require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const reservationSchema=new mongoose.Schema({
  reservation_id: { type: Number, auto: true },
    num_reservation:{type:Number,unique:true},
    clubname:String,
    num_salle: Number,
    date: Date,
    starttime: Date,
    endtime:Date,
    stat:Boolean
});
reservationSchema.plugin(AutoIncrement, { inc_field: 'num_reservation' });
const reservation=mongoose.model("Reservation",reservationSchema);
module.exports =reservation;


