// Import the connection to the database
import db from "../database/db.js";

// Import the DataTypes module from Sequelize
import { DataTypes } from "sequelize";
import EstablishmentsDetails from "./EstablishmentsDetailsModel.js";

// Define the EstablishmentsTokens model
const EstablishmentsTokens = db.define('establishments_tokens', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(32),
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'establishments_tokens', // Specify the table name here
    timestamps: false, // Disable automatic timestamps
});

// Define the relation with the EstablishmentsDetails table
EstablishmentsTokens.belongsTo(EstablishmentsDetails, {
    foreignKey: 'ID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Export the model
export default EstablishmentsTokens;
