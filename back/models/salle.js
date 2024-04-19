'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  salle.init({
    num_salle: DataTypes.INTEGER,
    nbre_place: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'salle',
  });
  return salle;
};