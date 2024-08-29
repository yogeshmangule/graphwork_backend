// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";
import EncuestaModel from "./EncuestaModel.js";

// Define el modelo para la tabla encuesta3
const AmbienteModel = db.define('encuesta3', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  musicaL: {
    type: DataTypes.TEXT
  },

  musicaM: {
    type: DataTypes.TEXT
  },

  musicaX: {
    type: DataTypes.TEXT
  },

  musicaJ: {
    type: DataTypes.TEXT
  },

  musicaV: {
    type: DataTypes.TEXT
  },

  musicaS: {
    type: DataTypes.TEXT
  },

  musicaD: {
    type: DataTypes.TEXT
  },

  edad: {
    type: DataTypes.TEXT
  },
  poder: {
    type: DataTypes.TEXT
  },
  aspecto: {
    type: DataTypes.TEXT
  },
  Observ: {
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
    defaultValue: DataTypes.NOW
  },
}, {
  tableName: 'encuesta3', // Especifica el nombre de la tabla aquí
});

// Define las relaciones con otros modelos
AmbienteModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
AmbienteModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });

// Exporta el modelo
export default AmbienteModel;
