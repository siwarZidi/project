const mongoose=require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ClubSchema=new mongoose.Schema({
  club_id: { type:Number, auto: true },
  name:String,
  num_club:{ type:Number, auto: true },   
  year:Number,
  email: {
        type: String,
        unique: true,
        required: true,
  },
  password: {
        type: String,
        minlength: 8,
        required: true,
  },
  image:String
});
ClubSchema.pre('save', function (next) {
      this.name = this.name.toUpperCase();
      next();
    });
const club=mongoose.model("Club",ClubSchema);
ClubSchema.plugin(AutoIncrement, { inc_field: 'num_club' });
module.exports =club;


