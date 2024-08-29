// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import EncuestaModel from "./EncuestaModel.js"; // Asegúrate de importar el modelo de Encuesta
import UserModel from "./UserModel.js";

// Define el modelo para la tabla encuesta2
const HorarioModel = db.define('encuesta2', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    horaLde: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaLa: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaMde: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaMa: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaXde: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaXa: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaJde: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaJa: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaVde: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaVa: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaSde: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaSa: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    horaDde: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaDa: {
        type: DataTypes.TIME,
        defaultValue: null
    },
    horaotras: {
        type: DataTypes.STRING,
        defaultValue: null
      },

}, {
    tableName: 'encuesta2', // Especifica el nombre de la tabla aquí
}); 

HorarioModel.belongsTo(UserModel, { as: 'usuario',foreignKey: 'user_id', onDelete: 'RESTRICT' });
HorarioModel.belongsTo(EncuestaModel, { as: 'encuesta',foreignKey: 'encuesta_id', onDelete: 'CASCADE' });

// Exporta el modelo
export default HorarioModel;
