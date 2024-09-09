// Importa el modelo y otros módulos necesarios
import ValoracionModel from '../models/ValoracionModel.js';
import UserModel from '../models/UserModel.js';
import EncuestaModel from '../models/EncuestaModel.js';
import { Op } from 'sequelize';

// Controlador para obtener todas las valoraciones
export const getAllValoraciones = async (req, res) => {
  try {
    const valoracionItems = await ValoracionModel.findAll();
    res.status(200).json(valoracionItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las valoraciones.' });
  }
};

// Controlador para obtener una valoración por ID
export const getIdValoracion = async (req, res) => {
  const valoracionId = req.params.id;

  try {
    const valoracionItem = await ValoracionModel.findByPk(valoracionId);

    if (!valoracionItem) {
      return res.status(404).json({ error: 'Valoración no encontrada.' });
    }

    res.status(200).json(valoracionItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la valoración.' });
  }
};

// Controlador para crear una nueva valoración
export const createValoracion = async (req, res) => {
  const nuevaValoracion = req.body;

  try {
    const valoracionCreada = await ValoracionModel.create(nuevaValoracion);
    res.status(201).json(valoracionCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la valoración.' });
  }
};

// Controlador para actualizar una valoración por ID
export const updateValoracion = async (req, res) => {
  const valoracionId = req.params.id;
  const datosActualizados = req.body;

  try {
    const valoracionItem = await ValoracionModel.findByPk(valoracionId);

    if (!valoracionItem) {
      return res.status(404).json({ error: 'Valoración no encontrada.' });
    }

    await valoracionItem.update(datosActualizados);
    res.status(200).json(valoracionItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la valoración.' });
  }
};

// Controlador para buscar valoraciones con ciertos criterios
export const searchValoracion = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const valoracionItems = await ValoracionModel.findAll({
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

    const valoracionItemsConDatos = valoracionItems.map(valoracionItem => ({
      ID: valoracionItem.ID,
      createdAt: valoracionItem.createdAt,
      updatedAt: valoracionItem.updatedAt,
      val_local: valoracionItem.val_local,
      val_personal: valoracionItem.val_personal,
      val_ambiente: valoracionItem.val_ambiente,
      val_interes: valoracionItem.val_interes,
      observ_val: valoracionItem.observ_val,
      archivo: valoracionItem.archivo,
      marca_comercial: valoracionItem.encuesta ? valoracionItem.encuesta.marca_comercial : null,
      username: valoracionItem.usuario ? valoracionItem.usuario.username : null,
      encuesta_id: valoracionItem.encuesta_id
    }));

    res.json(valoracionItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchValoracionId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const valoracionItems = await ValoracionModel.findAll({
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

    const valoracionItemsConDatos = valoracionItems.map(valoracionItem => ({
      ID: valoracionItem.ID,
      createdAt: valoracionItem.createdAt,
      updatedAt: valoracionItem.updatedAt,
      val_local: valoracionItem.val_local,
      val_personal: valoracionItem.val_personal,
      val_ambiente: valoracionItem.val_ambiente,
      val_interes: valoracionItem.val_interes,
      observ_val: valoracionItem.observ_val,
      archivo: valoracionItem.archivo,
      marca_comercial: valoracionItem.encuesta ? valoracionItem.encuesta.marca_comercial : null,
      username: valoracionItem.usuario ? valoracionItem.usuario.username : null,
    }));

    res.json(valoracionItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
