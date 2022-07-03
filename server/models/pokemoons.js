'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemoons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemoons.init({
    nickname: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    pokemonId: DataTypes.STRING,
    renameCount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pokemoons',
  });
  return Pokemoons;
};