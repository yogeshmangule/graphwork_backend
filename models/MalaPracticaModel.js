// Importa el módulo de Sequelize y los tipos de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";
import EncuestaModel from "./EncuestaModel.js";

// Define el modelo para la tabla encuesta13
const MalaPracticaModel = db.define('encuesta13', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mala_consum: {
        type: DataTypes.BOOLEAN,
    },
    dobles_puertas: {
        type: DataTypes.BOOLEAN,
    },
    acti_personal: {
        type: DataTypes.BOOLEAN,
    },
    incumpl_aforo: {
        type: DataTypes.BOOLEAN,
    },
    incumpl_norma: {
        type: DataTypes.BOOLEAN,
    },
    Molestias_local: {
        type: DataTypes.BOOLEAN,
    },
    consum_abus: {
        type: DataTypes.BOOLEAN,
    },
    consum_drogas: {
        type: DataTypes.BOOLEAN,
    },
    observ_malas: {
        type: DataTypes.TEXT,
    },
    inc_acceso: {
        type: DataTypes.BOOLEAN,
    },
    inc_acceso_desc: {
        type: DataTypes.TEXT,
    },
    expuls_arbitrarias: {
        type: DataTypes.BOOLEAN,
    },
    expuls_arbitrarias_desc: {
        type: DataTypes.TEXT,
    },
    altercados: {
        type: DataTypes.BOOLEAN,
    },
    altercados_desc: {
        type: DataTypes.TEXT,
    },
    observ_incid: {
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
    tableName: 'encuesta13', // Especifica el nombre de la tabla aquí
});

// Define relaciones con otros modelos
MalaPracticaModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
MalaPracticaModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });

// Exporta el modelo
export default MalaPracticaModel;
