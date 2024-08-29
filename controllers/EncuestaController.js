// controllers/encuestaController.js
import EncuestaModel from '../models/EncuestaModel.js';
import Encuesta from '../models/EncuestaModel.js';
import UserModel from '../models/UserModel.js';


export const getAllEncuesta = async (req, res) => {
  try {
    const encuestas = await Encuesta.findAll();
    res.status(200).json(encuestas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas.' });
  }
};

export const getIdEncuesta = async (req, res) => {
  const encuestaId = req.params.id;

  try {
    const encuesta = await Encuesta.findByPk(encuestaId);

    if (!encuesta) {
      return res.status(404).json({ error: 'Encuesta no encontrada.' });
    }

    res.status(200).json(encuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta.' });
  }
};

export const createEncuesta = async (req, res) => {
  const nuevaEncuesta = req.body;
  const { fecha_visita, hora_visita } = req.body;
  console.log('Fecha recibida en el servidor:', nuevaEncuesta.fecha_visita);
  console.log('Hora recibida en el servidor:', nuevaEncuesta.hora_visita);


  try {
    const encuestaCreada = await Encuesta.create(nuevaEncuesta);
    console.log(encuestaCreada, "encustaCred")
    res.status(201).json(encuestaCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta.' });
  }
};

export const updateEncuesta = async (req, res) => {
  const encuestaId = req.params.id;
  const datosActualizados = req.body;

  try {
    const encuesta = await Encuesta.findByPk(encuestaId);

    if (!encuesta) {
      return res.status(404).json({ error: 'Encuesta no encontrada.' });
    }

    await encuesta.update(datosActualizados);
    res.status(200).json(encuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta.' });
  }
};



// Importa Sequelize y el operador 'Op' para realizar comparaciones
import { Op } from 'sequelize';

export const searchEncuestas = async (req, res) => {
  const { full_name, email, createdAt } = req.query;

  try {
    const encuestas = await EncuestaModel.findAll({
      where: {
        [Op.and]: [
          full_name && { full_name: { [Op.like]: `%${full_name}%` } },
          email && { email: { [Op.like]: `%${email}%` } },
          createdAt && { createdAt },
        ].filter(Boolean),
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: UserModel,
          as: 'usuario', // Asegúrate de que 'usuario' coincida con el alias que tienes en tu modelo de EncuestaModel
          attributes: ['username'], // Selecciona solo el atributo 'username' del modelo User
        },
      ],
    });

    console.log('Full Name:', full_name);
    console.log('Email:', email);
    console.log('Created At:', createdAt);

    // Mapea los resultados para extraer solo los datos necesarios
    const encuestasConUsername = encuestas.map(encuesta => ({
      ID: encuesta.ID,
      fecha_visita: encuesta.fecha_visita,
      hora_visita: encuesta.hora_visita,
      marca_comercial: encuesta.marca_comercial,
      full_name: encuesta.full_name,
      dir: encuesta.dir,
      dir2: encuesta.dir2,
      city: encuesta.city,
      prov: encuesta.prov,
      postal: encuesta.postal,
      licencia: encuesta.licencia,
      dimensiones: encuesta.dimensiones,
      email: encuesta.email,
      phone: encuesta.phone,
      createdAt: encuesta.createdAt,
      updatedAt: encuesta.updatedAt,
      user_id: encuesta.user_id,
      usuario: {
        username: encuesta.usuario ? encuesta.usuario.username : null,
      },
    }));

    res.json(encuestasConUsername);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
export const searchEncuestasId = async (req, res) => {
  const { full_name, email, createdAt } = req.query;
  const userId = req.params.user_id;

  try {
    const encuestas = await EncuestaModel.findAll({
      where: {
        user_id: userId,
        [Op.and]: [
          full_name && { full_name: { [Op.like]: `%${full_name}%` } },
          email && { email: { [Op.like]: `%${email}%` } },
          createdAt && { createdAt },
        ].filter(Boolean),
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: UserModel,
          as: 'usuario', // Asegúrate de que 'usuario' coincida con el alias que tienes en tu modelo de EncuestaModel
          attributes: ['username'], // Selecciona solo el atributo 'username' del modelo User
        },
      ],
    });

    console.log('Full Name:', full_name);
    console.log('Email:', email);
    console.log('Created At:', createdAt);

    // Mapea los resultados para extraer solo los datos necesarios
    const encuestasConUsername = encuestas.map(encuesta => ({
      ID: encuesta.ID,
      fecha_visita: encuesta.fecha_visita,
      hora_visita: encuesta.hora_visita,
      marca_comercial: encuesta.marca_comercial,
      full_name: encuesta.full_name,
      dir: encuesta.dir,
      dir2: encuesta.dir2,
      city: encuesta.city,
      prov: encuesta.prov,
      postal: encuesta.postal,
      licencia: encuesta.licencia,
      dimensiones: encuesta.dimensiones,
      email: encuesta.email,
      phone: encuesta.phone,
      createdAt: encuesta.createdAt,
      updatedAt: encuesta.updatedAt,
      user_id: encuesta.user_id,
      usuario: {
        username: encuesta.usuario ? encuesta.usuario.username : null,
      },
    }));

    res.json(encuestasConUsername);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

