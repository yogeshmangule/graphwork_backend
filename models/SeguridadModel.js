// Import the database connection and the DataTypes module from Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";
import EncuestaModel from "./EncuestaModel.js";

// Define the model for the 'encuesta5' table
const SeguridadModel = db.define('encuesta5', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  evacuacion_entrada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  evacuacion_pista: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  evacuacion_accesoWC: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  evacuacion_barras: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  evacuacion_otro: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  controlaforo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Camaras: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ocupacion: {
    type: DataTypes.TEXT
  },
  Observ_segur: {
    type: DataTypes.STRING
  },
  hora_actv: {
    type: DataTypes.TEXT
  },
  Pago_efectivo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Pago_tarjeta: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Pago_cashless: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Pago_bizum: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Cuño: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Cuño_precio: {
    type: DataTypes.TEXT
  },
  observ_func: {
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
  tableName: 'encuesta5', // Specify the table name here
});

// Define relationships with other models
SeguridadModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
SeguridadModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });

// Export the model
export default SeguridadModel;
