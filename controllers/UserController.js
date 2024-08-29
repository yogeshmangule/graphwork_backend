import UserModel from '../models/UserModel.js';

import bcrypt from 'bcrypt';  // Necesitarás bcrypt para comparar contraseñas

// Controlador de inicio de sesión
export const login = async (req, res) => {
  try {
    const { email, passwd } = req.body;
    console.log(req.body, "re")
    // Buscar al usuario por correo
    const user = await UserModel.findOne({ where: { email: email, status: 1 } });
    console.log(user, "ss")
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(passwd, user.passwd);
    console.log(isPasswordValid, "first")

    if (!isPasswordValid) {
      console.log(isPasswordValid, "is")
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Si las credenciales son válidas, puedes devolver información adicional según el rol
    const userInfo = {
      ID: user.ID,
      username: user.username,
      email: user.email,
      role: user.role,
      isAutenticado: true
    };

    res.json({ userInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mostrar todos los registros de usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
    });
    console.log(users, "dsd")
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mostrar un usuario por ID
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { parent, username, email, passwd, role } = req.body;

    // Obtén la fecha actual para reg_date
    const currentDate = new Date();
    const newUser = await UserModel.create({
      parent: parent,
      username: username,
      email: email,
      passwd: passwd,
      status: 1,
      role: role,
      lenguaje: "spanish",
      reg_date: currentDate,
      last_login: null
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    await user.update(req.body);
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Cambiar el estado de manera dinámica
    const newStatus = user.status === 1 ? 0 : 1;

    await user.update({ status: newStatus });

    res.json({ message: `Estado del usuario cambiado a ${newStatus} correctamente` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Importa Sequelize y el operador 'Op' para realizar comparaciones
import { Op } from 'sequelize';

// Controlador para realizar búsquedas con filtros
export const searchUsers = async (req, res) => {
  const { username, email, status, createdAt } = req.query;
  const translatedStatus = status === 'activo' ? 1 : status === 'inactivo' ? 0 : status;

  try {
    const users = await UserModel.findAll({
      where: {
        [Op.and]: [
          username && { username: { [Op.like]: `%${username}%` } }, // Si alias está presente, busca por alias
          email && { email: { [Op.like]: `%${email}%` } }, // Si email está presente, busca por email
          status && { status: translatedStatus }, // Si status está presente, busca por estado
          createdAt && {
            createdAt
          }, // Si startDate y endDate están presentes, busca por rango de fecha de creación
        ].filter(Boolean), // Filtra elementos nulos para construir correctamente la condición AND
      },
      order: [
        ['createdAt', 'DESC'], // Ordena por fecha de creación descendente
      ],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};