// Importa la conexión a la base de datos
import db from "../database/db.js";

// Importa el módulo DataTypes de Sequelize
import { DataTypes } from "sequelize";

// Define el modelo de usuario
const UserModel = db.define('users_accounts', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'spanish'
    },
    reg_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: null
    },
}, {
    timestamps: true
});

// Exporta el modelo de usuario
export default UserModel;
