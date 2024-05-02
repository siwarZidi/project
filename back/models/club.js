const mongoose=require('mongoose');
const ClubSchema=new mongoose.Schema({
  club_id: { type:Number, auto: true },
      name:String,
      clubNum:Number,   
      year:Number,
      email:String,
      password:String
});
const club=mongoose.model("Club",ClubSchema);
module.exports =club;


