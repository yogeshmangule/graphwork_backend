// Import the connection to the database
import db from "../database/db.js";

// Import the DataTypes module from Sequelize
import { DataTypes } from "sequelize";
import EstablishmentsDetails from "./EstablishmentsDetailsModel.js";

// Define the EstablishmentsPictures model
const EstablishmentsPictures = db.define('establishments_pictures', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    buffer: {
        type: DataTypes.BLOB('long'),
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'establishments_pictures', // Specify the table name here
    timestamps: false, // Disable automatic timestamps
});

// Define the relation with the EstablishmentsDetails table
EstablishmentsPictures.belongsTo(EstablishmentsDetails, {
    foreignKey: 'ID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Export the model
export default EstablishmentsPictures;
