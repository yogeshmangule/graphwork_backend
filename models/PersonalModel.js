// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import EncuestaModel from "./EncuestaModel.js";
import UserModel from "./UserModel.js";

// Define el modelo para la tabla encuesta9
const PersonalModel = db.define('encuesta9', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    pers_seguridad: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    pers_seg_imagen: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    pers_seg_actitud: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    pers_seg_idioma_ingles: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    pers_seg_idioma_frances: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    pers_seg_idioma_otra: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    pers_barra: {
        type: DataTypes.INTEGER,
        defaultValue: null,
    },
    pers_barra_imagen: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    pers_barra_actitud: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    pers_barra_idioma_ingles: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    pers_barra_idioma_frances: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    pers_barra_idioma_otro: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    pers_cocteleria: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    observ_personal: {
        type: DataTypes.TEXT,
        defaultValue: null,
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
    tableName: 'encuesta9', // Especifica el nombre de la tabla aquí
});

PersonalModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });
PersonalModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });

// Exporta el modelo
export default PersonalModel;
