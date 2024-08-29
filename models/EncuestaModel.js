// // Importa la conexión a la base de datos
// import db from "../database/db.js";

// // Importa el módulo DataTypes de Sequelize
// import { DataTypes } from "sequelize";
// import User from "./UserModel.js"; 

// const EncuestaModel = db.define('encuesta', {
//     ID: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     fecha_visita: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     hora_visita: {
//       type: DataTypes.TIME,
//       allowNull: false,
//     },
//     marca_comercial: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     full_name: {
//       type: DataTypes.STRING,
//     },
//     dir: {
//       type: DataTypes.TEXT,
//     },
//     dir2: {
//       type: DataTypes.TEXT,
//     },
//     city: {
//       type: DataTypes.TEXT,
//     },
//     prov: {
//       type: DataTypes.TEXT,
//     },
//     postal: {
//       type: DataTypes.TEXT,
//     },
//     licencia: {
//       type: DataTypes.TEXT,
//     },
//     dimensiones: {
//       type: DataTypes.TEXT,
//     },
//     email: {
//       type: DataTypes.STRING,
//     },
//     phone: {
//       type: DataTypes.STRING,
//     },
//   }, {
//     tableName: 'encuesta', // Especifica el nombre de la tabla aquí
//   });

//   // Definir la relación con la tabla User
//   EncuestaModel.belongsTo(User, { as: 'usuario',foreignKey: 'user_id', onDelete: 'RESTRICT' });

//   // Exportar el modelo
//   export default EncuestaModel;



// // Import the connection to the database
// import db from "../database/db.js";

// // Import the DataTypes module from Sequelize
// import { DataTypes } from "sequelize";
// import User from "./UserModel.js";

// // Define the Encuesta model
// const EncuestaModel = db.define('encuesta', {
//   ID: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false
//   },
//   fecha_visita: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   hora_visita: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   marca_comercial: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   full_name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   dir: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   dir2: {
//     type: DataTypes.TEXT,
//   },
//   city: {
//     type: DataTypes.TEXT,
//   },
//   prov: {
//     type: DataTypes.TEXT,
//   },
//   postal: {
//     type: DataTypes.TEXT,
//   },
//   licencia: {
//     type: DataTypes.TEXT,
//   },
//   dimensiones: {
//     type: DataTypes.TEXT,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// }, {
//   tableName: 'encuesta', // Specify the table name here
// });

// // Define the relation with the User table
// EncuestaModel.belongsTo(User, { as: 'usuario', foreignKey: 'user_id', onDelete: 'RESTRICT' });

// // Export the model
// export default EncuestaModel;

// Import the connection to the database
import db from "../database/db.js";

// Import the DataTypes module from Sequelize
import { DataTypes } from "sequelize";
import User from "./UserModel.js";

// Define the Encuesta model
const EncuestaModel = db.define('encuesta', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fecha_visita: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora_visita: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Id_estab: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  marca_comercial: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
  },
  dir: {
    type: DataTypes.TEXT,
  },
  dir2: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.TEXT,
  },
  prov: {
    type: DataTypes.TEXT,
  },
  postal: {
    type: DataTypes.TEXT,
  },
  licencia: {
    type: DataTypes.TEXT,
  },
  dimensiones: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'encuesta', // Specify the table name here
});

// Define the relation with the User table
EncuestaModel.belongsTo(User, { as: 'usuario', foreignKey: 'user_id', onDelete: 'CASCADE' });

// Export the model
export default EncuestaModel;
