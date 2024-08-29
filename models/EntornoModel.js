// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";
import EncuestaModel from "./EncuestaModel.js";

// Define el modelo para la tabla 'encuesta6'
const EntornoModel = db.define('encuesta6', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  urbanismo: {
    type: DataTypes.TEXT
  },
  org_colas: {
    type: DataTypes.TEXT
  },
  espera_colas: {
    type: DataTypes.TEXT
  },
  cola_reservas: {
    type: DataTypes.BOOLEAN
  },
  cola_vip: {
    type: DataTypes.BOOLEAN
  },
  ruido_esterior: {
    type: DataTypes.TEXT
  },
  botellon_ext: {
    type: DataTypes.BOOLEAN
  },
  protestas: {
    type: DataTypes.BOOLEAN
  },
  observ_entorno: {
    type: DataTypes.TEXT
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
  tableName: 'encuesta6', // Especifica el nombre de la tabla aquí
});

// Define relaciones con otros modelos
EntornoModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
EntornoModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });

// Exporta el modelo
export default EntornoModel;
