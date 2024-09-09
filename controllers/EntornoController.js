// controllers/entornoController.js
import EntornoModel from '../models/EntornoModel.js';
import UserModel from '../models/UserModel.js';
import { Op } from 'sequelize';
import EncuestaModel from '../models/EncuestaModel.js';

export const getAllEntorno = async (req, res) => {
  try {
    const entornoItems = await EntornoModel.findAll();
    res.status(200).json(entornoItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de entorno.' });
  }
};

export const getIdEntorno = async (req, res) => {
  const entornoId = req.params.id;

  try {
    const entornoItem = await EntornoModel.findByPk(entornoId);

    if (!entornoItem) {
      return res.status(404).json({ error: 'Encuesta de entorno no encontrada.' });
    }

    res.status(200).json(entornoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de entorno.' });
  }
};

export const createEntorno = async (req, res) => {
  const nuevoEntorno = req.body;

  try {
    const entornoCreado = await EntornoModel.create(nuevoEntorno);
    res.status(201).json(entornoCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de entorno.' });
  }
};

export const updateEntorno = async (req, res) => {
  const entornoId = req.params.id;
  const datosActualizados = req.body;

  try {
    const entornoItem = await EntornoModel.findByPk(entornoId);

    if (!entornoItem) {
      return res.status(404).json({ error: 'Encuesta de entorno no encontrada.' });
    }

    await entornoItem.update(datosActualizados);
    res.status(200).json(entornoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de entorno.' });
  }
};

export const searchEntorno = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const entornoItems = await EntornoModel.findAll({
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

    const entornoItemsConDatos = entornoItems.map(entornoItem => ({
      ID: entornoItem.ID,
      createdAt: entornoItem.createdAt,
      updatedAt: entornoItem.updatedAt,
      urbanismo: entornoItem.urbanismo,
      org_colas: entornoItem.org_colas,
      espera_colas: entornoItem.espera_colas,
      cola_reservas: entornoItem.cola_reservas,
      cola_vip: entornoItem.cola_vip,
      ruido_esterior: entornoItem.ruido_esterior,
      botellon_ext: entornoItem.botellon_ext,
      protestas: entornoItem.protestas,
      observ_entorno: entornoItem.observ_entorno,
      marca_comercial: entornoItem.encuesta ? entornoItem.encuesta.marca_comercial : null,
      username: entornoItem.usuario ? entornoItem.usuario.username : null,
      encuesta_id: entornoItem.encuesta_id
    }));

    res.json(entornoItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchEntornoId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const entornoItems = await EntornoModel.findAll({
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

    const entornoItemsConDatos = entornoItems.map(entornoItem => ({
      ID: entornoItem.ID,
      createdAt: entornoItem.createdAt,
      updatedAt: entornoItem.updatedAt,
      urbanismo: entornoItem.urbanismo,
      org_colas: entornoItem.org_colas,
      espera_colas: entornoItem.espera_colas,
      cola_reservas: entornoItem.cola_reservas,
      cola_vip: entornoItem.cola_vip,
      ruido_esterior: entornoItem.ruido_esterior,
      botellon_ext: entornoItem.botellon_ext,
      protestas: entornoItem.protestas,
      observ_entorno: entornoItem.observ_entorno,
      marca_comercial: entornoItem.encuesta ? entornoItem.encuesta.marca_comercial : null,
      username: entornoItem.usuario ? entornoItem.usuario.username : null,
    }));

    res.json(entornoItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
