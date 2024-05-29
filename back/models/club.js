const mongoose=require('mongoose');
const ClubSchema=new mongoose.Schema({
  club_id: { type:Number, auto: true },
  name:String,
  clubNum:Number,   
  year:Number,
  email: {
        type: String,
        unique: true,
        required: true,
  },
  password: {
        type: String,
        minlength: 6,
        required: true,
  },
});
const club=mongoose.model("Club",ClubSchema);
module.exports =club;


