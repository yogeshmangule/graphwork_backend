// controllers/encuestaController.js
import AmbienteModel from '../models/AmbienteModel.js';
import Ambiente from '../models/AmbienteModel.js';
import UserModel from '../models/UserModel.js';
import { Op } from 'sequelize';
import EncuestaModel from '../models/EncuestaModel.js';


export const getAllAmbiente = async (req, res) => {
  try {
    const ambientes = await Ambiente.findAll();
    res.status(200).json(ambientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas.' });
  }
};

export const getIdAmbiente = async (req, res) => {
  const ambienteId = req.params.id;

  try {
    const ambiente = await Ambiente.findByPk(ambienteId);

    if (!ambiente) {
      return res.status(404).json({ error: 'Encuesta no encontrada.' });
    }

    res.status(200).json(ambiente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta.' });
  }
};

export const createAmbiente = async (req, res) => {
  const nuevaAmbiente = req.body;

  try {
    const ambienteCreada = await Ambiente.create(nuevaAmbiente);
    res.status(201).json(ambienteCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta.' });
  }
};

export const updateAmbiente = async (req, res) => {
  const ambienteId = req.params.id;
  const datosActualizados = req.body;

  try {
    const ambiente = await Ambiente.findByPk(ambienteId);

    if (!ambiente) {
      return res.status(404).json({ error: 'Encuesta no encontrada.' });
    }

    await ambiente.update(datosActualizados);
    res.status(200).json(ambiente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta.' });
  }
};

export const searchAmbiente = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const ambientes = await AmbienteModel.findAll({
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
    const ambientesConDatos = ambientes.map(ambiente => ({
      ID: ambiente.ID,
      musicaL: ambiente.musicaL,
      musicaM: ambiente.musicaM,
      musicaX: ambiente.musicaX,
      musicaJ: ambiente.musicaJ,
      musicaV: ambiente.musicaV,
      musicaS: ambiente.musicaS,
      musicaD: ambiente.musicaD,
      edad: ambiente.edad,
      poder: ambiente.poder,
      aspecto: ambiente.aspecto,
      Observ: ambiente.Observ,
      createdAt: ambiente.createdAt,
      updatedAt: ambiente.updatedAt,
      marca_comercial: ambiente.encuesta ? ambiente.encuesta.marca_comercial : null,
      username: ambiente.usuario ? ambiente.usuario.username : null,
      encuesta_id: ambiente.encuesta_id
    }));

    res.json(ambientesConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchAmbienteId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const ambientes = await AmbienteModel.findAll({
      where: {
        user_id: userId,
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
    const ambientesConDatos = ambientes.map(ambiente => ({
      ID: ambiente.ID,
      musicaL: ambiente.musicaL,
      musicaM: ambiente.musicaM,
      musicaX: ambiente.musicaX,
      musicaJ: ambiente.musicaJ,
      musicaV: ambiente.musicaV,
      musicaS: ambiente.musicaS,
      musicaD: ambiente.musicaD,
      edad: ambiente.edad,
      poder: ambiente.poder,
      aspecto: ambiente.aspecto,
      Observ: ambiente.Observ,
      createdAt: ambiente.createdAt,
      updatedAt: ambiente.updatedAt,
      marca_comercial: ambiente.encuesta ? ambiente.encuesta.marca_comercial : null,
      username: ambiente.usuario ? ambiente.usuario.username : null,
    }));

    res.json(ambientesConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

