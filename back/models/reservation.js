const mongoose=require('mongoose');
const Stat=require('./stat');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const reservationSchema=new mongoose.Schema({
  reservation_id: { type: Number, auto: true },
    num_reservation:{type:Number,unique:true,auto:true},
    workShopName:String,
    description:String,
    clubname:String,
    num_salle: Number,
    date: Date,
    starttime: Date,
    endtime: Date,
    trainer: String,
    statu: { type: String, enum: Object.values(Stat), default: Stat.PENDING }
});
reservationSchema.plugin(AutoIncrement, { inc_field: 'num_reservation' });
const reservation=mongoose.model("Reservation",reservationSchema);
module.exports =reservation;


