const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const salleSchema = new mongoose.Schema({
  salle_id: { type: Number, auto: true },
  num_salle: { type: Number, auto: true, unique:true},

  name:Number,

  nbre_place: Number
  
});
//name est le numero de la salle.

salleSchema.plugin(AutoIncrement, { inc_field: 'num_salle' });

const Salle = mongoose.model('Salle', salleSchema);
module.exports = Salle;
