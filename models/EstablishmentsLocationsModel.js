import { DataTypes, Sequelize } from "sequelize";
import db from "../database/db.js";
import EstablishmentsDetailsModel from "./EstablishmentsDetailsModel.js"; // Ensure this file exists

// Define the model for the 'establishments_locations' table
const EstablishmentsLocationsModel = db.define('establishments_locations', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    full_address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    coordinate: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false
    }
}, {
    tableName: 'establishments_locations', // Specify the table name here
    timestamps: false, // Disable automatic creation of createdAt and updatedAt columns
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// Define the relationship with the 'establishments_details' model
EstablishmentsLocationsModel.belongsTo(EstablishmentsDetailsModel, {
    as: 'establishment',
    foreignKey: 'ID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Export the model
export default EstablishmentsLocationsModel;
