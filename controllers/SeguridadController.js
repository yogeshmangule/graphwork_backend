// controllers/securityController.js
import SeguridadModel from '../models/SeguridadModel.js';
import UserModel from '../models/UserModel.js';
import { Op } from 'sequelize';
import EncuestaModel from '../models/EncuestaModel.js';

export const getAllSeguridad = async (req, res) => {
  try {
    const seguridadItems = await SeguridadModel.findAll();
    res.status(200).json(seguridadItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de seguridad.' });
  }
};

export const getIdSeguridad = async (req, res) => {
  const seguridadId = req.params.id;

  try {
    const seguridadItem = await SeguridadModel.findByPk(seguridadId);

    if (!seguridadItem) {
      return res.status(404).json({ error: 'Encuesta de seguridad no encontrada.' });
    }

    res.status(200).json(seguridadItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de seguridad.' });
  }
};

export const createSeguridad = async (req, res) => {
  const nuevaSeguridad = req.body;

  try {
    const seguridadCreada = await SeguridadModel.create(nuevaSeguridad);
    res.status(201).json(seguridadCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de seguridad.' });
  }
};

export const updateSeguridad = async (req, res) => {
  const seguridadId = req.params.id;
  const datosActualizados = req.body;

  try {
    const seguridadItem = await SeguridadModel.findByPk(seguridadId);

    if (!seguridadItem) {
      return res.status(404).json({ error: 'Encuesta de seguridad no encontrada.' });
    }

    await seguridadItem.update(datosActualizados);
    res.status(200).json(seguridadItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de seguridad.' });
  }
};

export const searchSeguridad = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const seguridadItems = await SeguridadModel.findAll({
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

    const seguridadItemsConDatos = seguridadItems.map(seguridadItem => ({
      ID: seguridadItem.ID,
      createdAt: seguridadItem.createdAt,
      updatedAt: seguridadItem.updatedAt,
      evacuacion_entrada: seguridadItem?.evacuacion_entrada  ? 'Entrada' : null,
      evacuacion_pista: seguridadItem?.evacuacion_pista  ? 'Pista' : null,
      evacuacion_accesoWC: seguridadItem?.evacuacion_accesoWC  ? 'Acceso WC' : null,
      evacuacion_barras: seguridadItem?.evacuacion_barras  ? 'Barras' : null,
      evacuacion_otro: seguridadItem.evacuacion_otro,
      controlaforo: seguridadItem?.controlaforo  ? 'Si' : 'No',
      Camaras: seguridadItem?.Camaras  ? 'Si' : 'No',
      ocupacion: seguridadItem.ocupacion,
      Observ_segur: seguridadItem.Observ_segur,
      hora_actv: seguridadItem.hora_actv,
      Pago_efectivo: seguridadItem?.Pago_efectivo ? 'Efectivo' : null,
      Pago_tarjeta: seguridadItem?.Pago_tarjeta ? 'Tarjeta' : null,
      Pago_cashless: seguridadItem?.Pago_cashless ? 'Cashless' : null,
      Pago_bizum: seguridadItem?.Pago_bizum ? 'Bizum' : null,
      Cuño: seguridadItem.Cuño ? 'Si' : 'No',
      Cuño_precio: seguridadItem.Cuño_precio,
      observ_func: seguridadItem.observ_func,
      marca_comercial: seguridadItem.encuesta ? seguridadItem.encuesta.marca_comercial : null,
      username: seguridadItem.usuario ? seguridadItem.usuario.username : null,
    }));

    res.json(seguridadItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const searchSeguridadId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const seguridadItems = await SeguridadModel.findAll({
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

    const seguridadItemsConDatos = seguridadItems.map(seguridadItem => ({
      ID: seguridadItem.ID,
      createdAt: seguridadItem.createdAt,
      updatedAt: seguridadItem.updatedAt,
      evacuacion_entrada: seguridadItem?.evacuacion_entrada  ? 'Entrada' : null,
      evacuacion_pista: seguridadItem?.evacuacion_pista  ? 'Pista' : null,
      evacuacion_accesoWC: seguridadItem?.evacuacion_accesoWC  ? 'Acceso WC' : null,
      evacuacion_barras: seguridadItem?.evacuacion_barras  ? 'Barras' : null,
      evacuacion_otro: seguridadItem.evacuacion_otro,
      controlaforo: seguridadItem?.controlaforo  ? 'Si' : 'No',
      Camaras: seguridadItem?.Camaras  ? 'Si' : 'No',
      ocupacion: seguridadItem.ocupacion,
      Observ_segur: seguridadItem.Observ_segur,
      hora_actv: seguridadItem.hora_actv,
      Pago_efectivo: seguridadItem?.Pago_efectivo ? 'Efectivo' : null,
      Pago_tarjeta: seguridadItem?.Pago_tarjeta ? 'Tarjeta' : null,
      Pago_cashless: seguridadItem?.Pago_cashless ? 'Cashless' : null,
      Pago_bizum: seguridadItem?.Pago_bizum ? 'Bizum' : null,
      Cuño: seguridadItem.Cuño ? 'Si' : 'No',
      Cuño_precio: seguridadItem.Cuño_precio,
      observ_func: seguridadItem.observ_func,
      marca_comercial: seguridadItem.encuesta ? seguridadItem.encuesta.marca_comercial : null,
      username: seguridadItem.usuario ? seguridadItem.usuario.username : null,
    }));

    res.json(seguridadItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
