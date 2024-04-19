'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async getById(id) {
      try {
        // Fetch the reservation with the specified ID
        const reservation = await reservation.findOne({ where: { reservation_id: id } });
        return reservation;
      } catch (error) {
        throw new Error(`Error retrieving reservation with ID ${id}: ${error.message}`);
      }
    }
  
  }
  reservation.init({
    reservation_id: DataTypes.INTEGER,
    clubname: DataTypes.STRING,
    num_salle: DataTypes.INTEGER,
    date: DataTypes.DATE,
    starttime: DataTypes.TIME,
    endtime: DataTypes.TIME,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false // Initialiser status à false par défaut
    }
  }, {
    sequelize,
    modelName: 'reservation',
  });
  return reservation;
};
