// Importa el modelo de Sequelize y otros modelos necesarios
import MalaPracticaModel from '../models/MalaPracticaModel.js';
import UserModel from '../models/UserModel.js';
import EncuestaModel from '../models/EncuestaModel.js';
import { Op } from 'sequelize';

export const getAllMalaPractica = async (req, res) => {
  try {
    const malaPracticaItems = await MalaPracticaModel.findAll();
    res.status(200).json(malaPracticaItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de mala práctica.' });
  }
};

export const getIdMalaPractica = async (req, res) => {
  const malaPracticaId = req.params.id;

  try {
    const malaPracticaItem = await MalaPracticaModel.findByPk(malaPracticaId);

    if (!malaPracticaItem) {
      return res.status(404).json({ error: 'Encuesta de mala práctica no encontrada.' });
    }

    res.status(200).json(malaPracticaItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de mala práctica.' });
  }
};

export const createMalaPractica = async (req, res) => {
  const nuevaMalaPractica = req.body;

  try {
    const malaPracticaCreada = await MalaPracticaModel.create(nuevaMalaPractica);
    res.status(201).json(malaPracticaCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de mala práctica.' });
  }
};

export const updateMalaPractica = async (req, res) => {
  const malaPracticaId = req.params.id;
  const datosActualizados = req.body;

  try {
    const malaPracticaItem = await MalaPracticaModel.findByPk(malaPracticaId);

    if (!malaPracticaItem) {
      return res.status(404).json({ error: 'Encuesta de mala práctica no encontrada.' });
    }

    await malaPracticaItem.update(datosActualizados);
    res.status(200).json(malaPracticaItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de mala práctica.' });
  }
};

export const searchMalaPractica = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const malaPracticaItems = await MalaPracticaModel.findAll({
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

    const malaPracticaItemsConDatos = malaPracticaItems.map(malaPracticaItem => ({
      ID: malaPracticaItem.ID,
      createdAt: malaPracticaItem.createdAt,
      updatedAt: malaPracticaItem.updatedAt,
      mala_consum: malaPracticaItem.mala_consum,
      dobles_puertas: malaPracticaItem.dobles_puertas,
      acti_personal: malaPracticaItem.acti_personal,
      incumpl_aforo: malaPracticaItem.incumpl_aforo,
      incumpl_norma: malaPracticaItem.incumpl_norma,
      Molestias_local: malaPracticaItem.Molestias_local,
      consum_abus: malaPracticaItem.consum_abus,
      consum_drogas: malaPracticaItem.consum_drogas,
      observ_malas: malaPracticaItem.observ_malas,
      observ_incid: malaPracticaItem.observ_incid,
      marca_comercial: malaPracticaItem.encuesta ? malaPracticaItem.encuesta.marca_comercial : null,
      username: malaPracticaItem.usuario ? malaPracticaItem.usuario.username : null,
      encuesta_id: malaPracticaItem.encuesta_id
    }));

    res.json(malaPracticaItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchMalaPracticaId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const malaPracticaItems = await MalaPracticaModel.findAll({
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

    const malaPracticaItemsConDatos = malaPracticaItems.map(malaPracticaItem => ({
      ID: malaPracticaItem.ID,
      createdAt: malaPracticaItem.createdAt,
      updatedAt: malaPracticaItem.updatedAt,
      mala_consum: malaPracticaItem.mala_consum,
      dobles_puertas: malaPracticaItem.dobles_puertas,
      acti_personal: malaPracticaItem.acti_personal,
      incumpl_aforo: malaPracticaItem.incumpl_aforo,
      incumpl_norma: malaPracticaItem.incumpl_norma,
      Molestias_local: malaPracticaItem.Molestias_local,
      consum_abus: malaPracticaItem.consum_abus,
      consum_drogas: malaPracticaItem.consum_drogas,
      observ_malas: malaPracticaItem.observ_malas,
      observ_incid: malaPracticaItem.observ_incid,
      marca_comercial: malaPracticaItem.encuesta ? malaPracticaItem.encuesta.marca_comercial : null,
      username: malaPracticaItem.usuario ? malaPracticaItem.usuario.username : null,
    }));

    res.json(malaPracticaItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
