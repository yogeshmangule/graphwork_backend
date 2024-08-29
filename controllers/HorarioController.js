// controllers/encuestaController.js
import Horario from '../models/HorarioModel.js';
import HorariosModel from '../models/HorarioModel.js';
import EncuestaModel from '../models/EncuestaModel.js';
import { Op } from 'sequelize';

import UserModel from '../models/UserModel.js';

export const getAllHorarios = async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.status(200).json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas.' });
  }
};

export const getIdHorario = async (req, res) => {
  const horarioId = req.params.id;

  try {
    const encuesta = await Horario.findByPk(horarioId);

    if (!encuesta) {
      return res.status(404).json({ error: 'Encuesta no encontrada.' });
    }

    res.status(200).json(encuesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta.' });
  }
};

export const createHorario = async (req, res) => {
  const nuevaEncuesta = req.body;

  try {
    const encuestaCreada = await Horario.create(nuevaEncuesta);
    res.status(201).json(encuestaCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta.' });
  }
};

export const updateHorario = async (req, res) => {
  const encuestaId = req.params.id;
  const datosActualizados = req.body;

  try {
    const encuesta = await Horario.findByPk(encuestaId);

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

export const searchHorario = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const horarios = await HorariosModel.findAll({
      where: {
        [Op.and]: [
          createdAt && { createdAt },
        ].filter(Boolean),
      },
      include: [
        {
          model: EncuestaModel,
          as: 'encuesta',
          attributes: ['marca_comercial'],
          where: {
            marca_comercial: {
              [Op.like]: `%${marca_comercial || ''}%`,
            },
          },
        },
        {
          model: UserModel,
          as: 'usuario',
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Mapea los resultados para extraer solo los datos necesarios
    const horariosConDatos = horarios.map(horario => ({
      ID: horario.ID,
      horaLde: horario.horaLde,
      horaLa: horario.horaLa,
      horaMde: horario.horaMde,
      horaMa: horario.horaMa,
      horaXde: horario.horaXde,
      horaXa: horario.horaXa,
      horaJde: horario.horaJde,
      horaJa: horario.horaJa,
      horaVde: horario.horaVde,
      horaVa: horario.horaVa,
      horaSde: horario.horaSde,
      horaSa: horario.horaSa,
      horaDde: horario.horaDde,
      horaDa: horario.horaDa,
      horasotras: horario.horasotras,
      encuesta_id: horario.encuesta_id,
      user_id: horario.user_id,
      createdAt: horario.createdAt,
      updatedAt: horario.updatedAt,
      full_name_encuesta: horario.encuesta ? horario.encuesta.full_name : null,
      marca_comercial: horario.encuesta ? horario.encuesta.marca_comercial : null,
      username: horario.usuario ? horario.usuario.username : null,
    }));

    res.json(horariosConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const searchHorarioId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;
  console.log("req:-", userId)
  try {
    const horarios = await HorariosModel.findAll({
      where: {
        user_id: userId,
        [Op.and]: [
          createdAt && { createdAt },
        ].filter(Boolean),
      },
      include: [
        {
          model: EncuestaModel,
          as: 'encuesta',
          attributes: ['marca_comercial'],
          where: {
            marca_comercial: {
              [Op.like]: `%${marca_comercial || ''}%`,
            },
          },
        },
        {
          model: UserModel,
          as: 'usuario',
          attributes: ['username'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Mapea los resultados para extraer solo los datos necesarios
    const horariosConDatos = horarios.map(horario => ({
      ID: horario.ID,
      horaLde: horario.horaLde,
      horaLa: horario.horaLa,
      horaMde: horario.horaMde,
      horaMa: horario.horaMa,
      horaXde: horario.horaXde,
      horaXa: horario.horaXa,
      horaJde: horario.horaJde,
      horaJa: horario.horaJa,
      horaVde: horario.horaVde,
      horaVa: horario.horaVa,
      horaSde: horario.horaSde,
      horaSa: horario.horaSa,
      horaDde: horario.horaDde,
      horaDa: horario.horaDa,
      horasotras: horario.horasotras,
      encuesta_id: horario.encuesta_id,
      user_id: horario.user_id,
      createdAt: horario.createdAt,
      updatedAt: horario.updatedAt,
      full_name_encuesta: horario.encuesta ? horario.encuesta.full_name : null,
      marca_comercial: horario.encuesta ? horario.encuesta.marca_comercial : null,
      username: horario.usuario ? horario.usuario.username : null,
    }));

    res.json(horariosConDatos);
  } catch (error) {
    console.error("error:0", error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const checkEncuestaId = async (req, res) => {
  const encuestaId = req.params.encuesta_id;

  try {
    // Buscar un horario por encuesta_id
    const horario = await Horario.findOne({
      where: { encuesta_id: encuestaId },
    });

    // Devolver true si se encontró un horario, de lo contrario, false
    res.json({ exists: Boolean(horario) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

