import db from "../database/db.js";
import { DataTypes } from "sequelize";
import UserModel from "./UserModel.js";
import EncuestaModel from "./EncuestaModel.js";

const BuenaPracticaModel = db.define('encuesta12', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      info_online: {
        type: DataTypes.BOOLEAN,
      },
      mediacion_sala: {
        type: DataTypes.BOOLEAN,
      },
      ruido: {
        type: DataTypes.BOOLEAN,
      },
      seg_vial: {
        type: DataTypes.BOOLEAN,
      },
      Punto_viol: {
        type: DataTypes.BOOLEAN,
      },
      respon_bebidas: {
        type: DataTypes.BOOLEAN,
      },
      reciclaje: {
        type: DataTypes.BOOLEAN,
      },
      sello_calidad: {
        type: DataTypes.BOOLEAN,
      },
      observ_buenas: {
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
      tableName: 'encuesta12', // Especifica el nombre de la tabla aquí
    });
    
    // Define relaciones con otros modelos
    BuenaPracticaModel.belongsTo(EncuestaModel, { as: 'encuesta', foreignKey: 'encuesta_id', onDelete: 'CASCADE' });
    BuenaPracticaModel.belongsTo(UserModel, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });
    
    // Exporta el modelo
    export default BuenaPracticaModel;
    