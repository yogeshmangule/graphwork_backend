// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import EncuestaModel from "./EncuestaModel.js"; // Asegúrate de importar el modelo de Encuesta
import UserModel from "./UserModel.js";

// Define el modelo para la tabla encuesta7
const ServicioModel = db.define('encuesta7', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    marca_bebidas_premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      marca_bebidas_standar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      marca_bebidas_blancas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      marca_bebidas_otras: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      vajilla_tubo_extra: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      vajilla_tubo_standar: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      vajilla_copa_balon: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      vajilla_sidra: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      vajilla_plastico: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      vajilla_otras: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
    hielo: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    refresco: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    amabilidad: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    esperabarra: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    disp_alimentos: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    mesas_reservados: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    mesas_num: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    mesas_percent: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
    venta_botellas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      shisas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    observ_servicio: {
        type: DataTypes.TEXT,
        defaultValue: null
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
    tableName: 'encuesta7', // Especifica el nombre de la tabla aquí
}); 

ServicioModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });
ServicioModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });

// Exporta el modelo
export default ServicioModel;
