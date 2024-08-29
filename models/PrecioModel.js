// Import the database connection and the DataTypes module from Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";
import EncuestaModel from "./EncuestaModel.js";

const PrecioModel  = db.define('encuesta5', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tipo_entradas: {
      type: DataTypes.TEXT,
    },
    precio_anticipada: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_taquilla: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    descuentos: {
      type: DataTypes.TEXT,
    },
    lista_puerta: {
      type: DataTypes.BOOLEAN,
    },
    lista_puerta_cond: {
      type: DataTypes.TEXT,
    },
    precio_agua: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_refresco: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_cerveza: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_combinado: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_combinado_prem: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_chupito: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_botella: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_mesa: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_guardarropia: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_marchandising: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    precio_otros: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null,
    },
    observ_precios: {
      type: DataTypes.TEXT,
    },
    turistas_porc: {
      type: DataTypes.TEXT,
    },
    turistic_pers_idiomas: {
      type: DataTypes.BOOLEAN,
    },
    turistic_pers_idiomas_cual_ingles: {
      type: DataTypes.BOOLEAN,
    },
    turistic_pers_idiomas_cual_frances: {
      type: DataTypes.BOOLEAN,
    },
    turistic_pers_idiomas_cual_otro: {
      type: DataTypes.TEXT,
    },
    señal_idiomas: {
      type: DataTypes.BOOLEAN,
    },
    señal_idiomas_cual_ingles: {
      type: DataTypes.BOOLEAN,
    },
    señal_idiomas_cual_frances: {
      type: DataTypes.BOOLEAN,
    },
    señal_idiomas_cual_otro: {
      type: DataTypes.TEXT,
    },
    pers_att_grupos: {
      type: DataTypes.BOOLEAN,
    },
    pers_att_grupos_cual: {
      type: DataTypes.TEXT,
    },
    venta_online_idiomas: {
      type: DataTypes.BOOLEAN,
    },
    venta_online_idiomas_cual_ingles: {
      type: DataTypes.BOOLEAN,
    },
    venta_online_idiomas_cual_frances: {
      type: DataTypes.BOOLEAN,
    },
    venta_online_idiomas_cual_otro: {
      type: DataTypes.TEXT,
    },
    Obsrv_att_turist: {
      type: DataTypes.TEXT,
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
    tableName: 'encuesta11', // Specify the table name here
  });
  
  // Define relationships with other models
  PrecioModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
  PrecioModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });
  
  // Export the model
  export default PrecioModel;
  