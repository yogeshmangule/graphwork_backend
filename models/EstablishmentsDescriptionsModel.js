import { DataTypes } from 'sequelize';
import db from '../database/db.js';
import EstablishmentsDetailsModel from './EstablishmentsDetailsModel.js';
// import EstablishmentsDetailsModel from './EstablishmentsDetailsModel.js';
// import EstablishmentsDetailsModel from "./EstablishmentsDetailsModel.js"; // Ensure this file exists

// Define the model for the 'establishments_descriptions' table
const EstablishmentsDescriptionsModel = db.define('establishments_descriptions', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    language: {
        type: DataTypes.STRING(16),
        primaryKey: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'establishments_descriptions',
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
});

// Define the relationship with the 'establishments_details' model
EstablishmentsDescriptionsModel.belongsTo(EstablishmentsDetailsModel, {
    as: 'establishment',
    foreignKey: 'ID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Export the model
export default EstablishmentsDescriptionsModel;
