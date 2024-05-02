  const mongoose=require('mongoose');
  const salleSchema=new mongoose.Schema({
    salle_id: { type: Number, auto: true },
    num_salle: { type:Number, auto: true },
      nbre_place: Number
  });
const salle=mongoose.model('Salle',salleSchema);
module.exports=salle;


