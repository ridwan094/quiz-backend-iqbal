'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class akun extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      akun.belongsTo(models.siswa, {
        foreignKey: 'siswa_id',
        as: 'siswa'
      });
      akun.belongsTo(models.kelas, {
        foreignKey: 'kelas_id',
        as: 'kelas'
      });
    }
  }
  akun.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'akun',
  });
  return akun;
};