// Importa la conexión a la base de datos y el módulo DataTypes de Sequelize
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import EncuestaModel from "./EncuestaModel.js";
import UserModel from "./UserModel.js";

// Define el modelo para la tabla encuesta10
const MarketingModel = db.define('encuesta10', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    link_drive: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    web_activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    quienes_somos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    servicios: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    eventos: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    contacto: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    facebbok: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    facebook_act: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    facebook_publ_mes: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    instagram: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    instagram_act: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    instagram_publ_mes: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    otras_redes: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    otras_redes_cual: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    otras_redes_act: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    otras_redes_publ_mes: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    ficha_google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ficha_google_control: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ficha_google_ubica: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ficha_google_hora: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ficha_google_desc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    ficha_google_serv: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    venta_entradas: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    plataf_vta_entr_name: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    plataf_vta_entr_accweb: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    plataf_vta_entr_accrrss: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    plataf_vta_entr_o: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    plataf_vta_entr_name_o: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    plataf_vta_entr_accweb_o: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    plataf_vta_entr_accrrss_o: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_online_name: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
    reserva_online_accweb: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_online_accrrss: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_lista_puerta: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_lista_pta_web: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_lista_pta_rrss: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_lista_pta_tel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_lista_pta_rrpp: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_mesa: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_mesa_web: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_mesa_rrss: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_mesa_tel: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reserva_mesa_rrpp: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    Observ_marketing: {
        type: DataTypes.STRING(255),
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
    tableName: 'encuesta10', // Especifica el nombre de la tabla aquí
}); 

MarketingModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });
MarketingModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });

// Exporta el modelo
export default MarketingModel;
