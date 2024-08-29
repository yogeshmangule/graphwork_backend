// import { DataTypes } from 'sequelize';
// import db from "../database/db.js";

// // Define the model for the 'establishments_details' table
// const EstablishmentsDetailsModel = db.define('establishments_details', {
//     ID: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//     },
//     owner: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     name: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//         unique: true,
//     },
//     status: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 1,
//     },
//     created_at: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//     },
//     updated_at: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         onUpdate: DataTypes.NOW,
//     },
// }, {
//     tableName: 'establishments_details',
//     timestamps: false, // Disable automatic creation of createdAt and updatedAt columns
//     charset: 'utf8',
//     collate: 'utf8_general_ci',
// });

// // Export the model
// export default EstablishmentsDetailsModel;


import { DataTypes } from "sequelize";
import db from "../database/db.js";
import UserModel from "./UserModel.js"; // Ensure this file exists
import EstablishmentsDescriptionsModel from "./EstablishmentsDescriptionsModel.js";
import EstablishmentsLocationsModel from "./EstablishmentsLocationsModel.js"; // Ensure this file exists

// Define the model for the 'establishments_details' table
const EstablishmentsDetailsModel = db.define('establishments_details', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'ID'
        },
        onUpdate: 'CASCADE'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'establishments_details', // Specify the table name here
    timestamps: false, // Disable automatic creation of createdAt and updatedAt columns
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// Define the relationship with the 'users_accounts' model
EstablishmentsDetailsModel.belongsTo(UserModel, {
    as: 'ownerAccount',
    foreignKey: 'owner',
    onUpdate: 'CASCADE'
});

// Define the relationship with the 'establishments_descriptions' model
EstablishmentsDetailsModel.hasMany(EstablishmentsDescriptionsModel, {
    as: 'descriptions',
    foreignKey: 'ID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Define the relationship with the 'establishments_locations' model
EstablishmentsDetailsModel.hasOne(EstablishmentsLocationsModel, {
    as: 'location',
    foreignKey: 'ID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Export the model
export default EstablishmentsDetailsModel;
