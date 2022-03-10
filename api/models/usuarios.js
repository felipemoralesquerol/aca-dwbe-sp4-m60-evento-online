const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class UsuariosModel extends Model { }

UsuariosModel.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING
    },
    telefono: {
      type: DataTypes.STRING
    },
    direccion_envio: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    borrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    suspendido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'usuario',
    createdAt: 'createTimestamp',
    updatedAt: 'updateTimestamp',
    underscored: true
  }
);

module.exports = UsuariosModel;
