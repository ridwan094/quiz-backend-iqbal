'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      siswa.hasOne(models.akun, {
        foreignKey: 'siswa_id',
        as: 'akun'
      });
    }
  }
  siswa.init({
    nama: DataTypes.STRING,
    tanggal_lahir: DataTypes.STRING,
    tempat_lahir: DataTypes.STRING,
    kelas: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    nama_ortu: DataTypes.STRING,
    no_hp_ortu: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
  });
  return siswa;
};