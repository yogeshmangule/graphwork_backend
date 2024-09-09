import BuenaPracticaModel from '../models/BuenaPracticaModel.js';
import UserModel from '../models/UserModel.js';
import EncuestaModel from '../models/EncuestaModel.js';
import { Op } from 'sequelize';

export const getAllBuenaPractica = async (req, res) => {
  try {
    const buenaPracticaItems = await BuenaPracticaModel.findAll();
    res.status(200).json(buenaPracticaItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de buena práctica.' });
  }
};

export const getIdBuenaPractica = async (req, res) => {
  const buenaPracticaId = req.params.id;

  try {
    const buenaPracticaItem = await BuenaPracticaModel.findByPk(buenaPracticaId);

    if (!buenaPracticaItem) {
      return res.status(404).json({ error: 'Encuesta de buena práctica no encontrada.' });
    }

    res.status(200).json(buenaPracticaItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de buena práctica.' });
  }
};

export const createBuenaPractica = async (req, res) => {
  const nuevaBuenaPractica = req.body;

  try {
    const buenaPracticaCreada = await BuenaPracticaModel.create(nuevaBuenaPractica);
    res.status(201).json(buenaPracticaCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de buena práctica.' });
  }
};

export const updateBuenaPractica = async (req, res) => {
  const buenaPracticaId = req.params.id;
  const datosActualizados = req.body;

  try {
    const buenaPracticaItem = await BuenaPracticaModel.findByPk(buenaPracticaId);

    if (!buenaPracticaItem) {
      return res.status(404).json({ error: 'Encuesta de buena práctica no encontrada.' });
    }

    await buenaPracticaItem.update(datosActualizados);
    res.status(200).json(buenaPracticaItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de buena práctica.' });
  }
};

export const searchBuenaPractica = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const buenaPracticaItems = await BuenaPracticaModel.findAll({
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

    const buenaPracticaItemsConDatos = buenaPracticaItems.map(buenaPracticaItem => ({
      ID: buenaPracticaItem.ID,
      createdAt: buenaPracticaItem.createdAt,
      updatedAt: buenaPracticaItem.updatedAt,
      info_online: buenaPracticaItem.info_online,
      mediacion_sala: buenaPracticaItem.mediacion_sala,
      ruido: buenaPracticaItem.ruido,
      seg_vial: buenaPracticaItem.seg_vial,
      Punto_viol: buenaPracticaItem.Punto_viol,
      respon_bebidas: buenaPracticaItem.respon_bebidas,
      reciclaje: buenaPracticaItem.reciclaje,
      sello_calidad: buenaPracticaItem.sello_calidad,
      observ_buenas: buenaPracticaItem.observ_buenas,
      marca_comercial: buenaPracticaItem.encuesta ? buenaPracticaItem.encuesta.marca_comercial : null,
      username: buenaPracticaItem.usuario ? buenaPracticaItem.usuario.username : null,
      encuesta_id: buenaPracticaItem.encuesta_id
    }));

    res.json(buenaPracticaItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchBuenaPracticaId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const buenaPracticaItems = await BuenaPracticaModel.findAll({
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

    const buenaPracticaItemsConDatos = buenaPracticaItems.map(buenaPracticaItem => ({
      ID: buenaPracticaItem.ID,
      createdAt: buenaPracticaItem.createdAt,
      updatedAt: buenaPracticaItem.updatedAt,
      info_online: buenaPracticaItem.info_online,
      mediacion_sala: buenaPracticaItem.mediacion_sala,
      ruido: buenaPracticaItem.ruido,
      seg_vial: buenaPracticaItem.seg_vial,
      Punto_viol: buenaPracticaItem.Punto_viol,
      respon_bebidas: buenaPracticaItem.respon_bebidas,
      reciclaje: buenaPracticaItem.reciclaje,
      sello_calidad: buenaPracticaItem.sello_calidad,
      observ_buenas: buenaPracticaItem.observ_buenas,
      marca_comercial: buenaPracticaItem.encuesta ? buenaPracticaItem.encuesta.marca_comercial : null,
      username: buenaPracticaItem.usuario ? buenaPracticaItem.usuario.username : null,
    }));

    res.json(buenaPracticaItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

