// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";
import EncuestaModel from "./EncuestaModel.js";

// Define el modelo para la tabla encuesta4
const InstalacionesModel = db.define('encuesta4', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  pista: {
    type: DataTypes.TEXT
  },
  escenario: {
    type: DataTypes.BOOLEAN
  },
  zonamesas: {
    type: DataTypes.BOOLEAN
  },
  perc_mesas: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  barras: {
    type: DataTypes.INTEGER
  },
  barrasmetros: {
    type: DataTypes.INTEGER
  },
  barraspersons: {
    type: DataTypes.INTEGER
  },
  decoracion: {
    type: DataTypes.TEXT
  },
  climatizacion: {
    type: DataTypes.BOOLEAN
  },
  climat_temp: {
    type: DataTypes.TEXT
  },
  limp_durante: {
    type: DataTypes.TEXT
  },
  limp_ensesion: {
    type: DataTypes.BOOLEAN
  },
  Mantenimiento: {
    type: DataTypes.TEXT
  },
  Observ_instal: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  },
}, {
  tableName: 'encuesta4', // Especifica el nombre de la tabla aquí
});

// Define las relaciones con otros modelos
InstalacionesModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
InstalacionesModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });

// Exporta el modelo
export default InstalacionesModel;
