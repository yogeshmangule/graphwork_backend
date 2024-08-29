// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import EncuestaModel from "./EncuestaModel.js";
import UserModel from "./UserModel.js";

// Define el modelo para la tabla encuesta8
const EspectaculoModel = db.define('encuesta8', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amb_musical_no: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    amb_musical_residente: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    amb_musical_playlist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    amb_musical_liveset: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    amb_musical_gruposm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    estilo_musical_comercial: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    estilo_musical_reggaeton: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    estilo_musical_electro: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    estilo_musical_remember: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    estilo_musical_otro: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    volumen_musica: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    animacion: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    visuales: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    visuales_si_efecto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    visuales_si_proyeccion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    visuales_si_pantalla: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    bengalas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    bengalas_si_uso_mesas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    bengalas_si_uso_eqipos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    bengalas_si_uso_publico: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ropia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ropia_precio: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    ropia_estado: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    observ_espectaculos: {
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
    tableName: 'encuesta8', // Especifica el nombre de la tabla aquí
}); 

EspectaculoModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });
EspectaculoModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });

// Exporta el modelo
export default EspectaculoModel;
