// Importa el módulo Sequelize y el modelo de usuario
import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import UserModel from './UserModel.js';
import EncuestaModel from './EncuestaModel.js';

// Define el modelo para la tabla encuesta14
const ValoracionModel = db.define('encuesta14', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  val_local: {
    type: DataTypes.TEXT,
  },
  val_personal: {
    type: DataTypes.TEXT,
  },
  val_ambiente: {
    type: DataTypes.TEXT,
  },
  val_interes: {
    type: DataTypes.TEXT,
  },
  observ_val: {
    type: DataTypes.TEXT,
  },
  archivo: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
}, {
  tableName: 'encuesta14', // Especifica el nombre de la tabla aquí
});

// Define relaciones con otros modelos
ValoracionModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
ValoracionModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });

// Exporta el modelo
export default ValoracionModel;
