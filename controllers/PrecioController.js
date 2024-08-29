import PrecioModel from '../models/PrecioModel.js';
import UserModel from '../models/UserModel.js';
import EncuestaModel from '../models/EncuestaModel.js';
import { Op } from 'sequelize';

export const getAllPrecios = async (req, res) => {
  try {
    const precioItems = await PrecioModel.findAll();
    res.status(200).json(precioItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de precios.' });
  }
};

export const getIdPrecio = async (req, res) => {
  const precioId = req.params.id;

  try {
    const precioItem = await PrecioModel.findByPk(precioId);

    if (!precioItem) {
      return res.status(404).json({ error: 'Encuesta de precios no encontrada.' });
    }

    res.status(200).json(precioItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de precios.' });
  }
};

export const createPrecio = async (req, res) => {
  const nuevaPrecio = req.body;

  try {
    const precioCreada = await PrecioModel.create(nuevaPrecio);
    res.status(201).json(precioCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de precios.' });
  }
};

export const updatePrecio = async (req, res) => {
  const precioId = req.params.id;
  const datosActualizados = req.body;

  try {
    const precioItem = await PrecioModel.findByPk(precioId);

    if (!precioItem) {
      return res.status(404).json({ error: 'Encuesta de precios no encontrada.' });
    }

    await precioItem.update(datosActualizados);
    res.status(200).json(precioItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de precios.' });
  }
};

export const searchPrecio = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const precioItems = await PrecioModel.findAll({
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

    const precioItemsConDatos = precioItems.map(precioItem => ({
      ID: precioItem.ID,
      createdAt: precioItem.createdAt,
      updatedAt: precioItem.updatedAt,
      tipo_entradas: precioItem.tipo_entradas,
      precio_anticipada: precioItem.precio_anticipada,
      precio_taquilla: precioItem.precio_taquilla,
      descuentos: precioItem.descuentos,
      lista_puerta: precioItem.lista_puerta,
      lista_puerta_cond: precioItem.lista_puerta_cond,
      precio_agua: precioItem.precio_agua,
      precio_refresco: precioItem.precio_refresco,
      precio_cerveza: precioItem.precio_cerveza,
      precio_combinado: precioItem.precio_combinado,
      precio_combinado_prem: precioItem.precio_combinado_prem,
      precio_chupito: precioItem.precio_chupito,
      precio_botella: precioItem.precio_botella,
      precio_mesa: precioItem.precio_mesa,
      precio_guardarropia: precioItem.precio_guardarropia,
      precio_marchandising: precioItem.precio_marchandising,
      precio_otros: precioItem.precio_otros,
      observ_precios: precioItem.observ_precios,
      turistas_porc: precioItem.turistas_porc,
      turistic_pers_idiomas: precioItem.turistic_pers_idiomas,
      turistic_pers_idiomas_cual_ingles: precioItem.turistic_pers_idiomas_cual_ingles,
      turistic_pers_idiomas_cual_frances: precioItem.turistic_pers_idiomas_cual_frances,
      turistic_pers_idiomas_cual_otro: precioItem.turistic_pers_idiomas_cual_otro,
      señal_idiomas: precioItem.señal_idiomas,
      señal_idiomas_cual_ingles: precioItem.señal_idiomas_cual_ingles,
      señal_idiomas_cual_frances: precioItem.señal_idiomas_cual_frances,
      señal_idiomas_cual_otro: precioItem.señal_idiomas_cual_otro,
      pers_att_grupos: precioItem.pers_att_grupos,
      pers_att_grupos_cual: precioItem.pers_att_grupos_cual,
      venta_online_idiomas: precioItem.venta_online_idiomas,
      venta_online_idiomas_cual_ingles: precioItem.venta_online_idiomas_cual_ingles,
      venta_online_idiomas_cual_frances: precioItem.venta_online_idiomas_cual_frances,
      venta_online_idiomas_cual_otro: precioItem.venta_online_idiomas_cual_otro,
      Obsrv_att_turist: precioItem.Obsrv_att_turist,
      marca_comercial: precioItem.encuesta ? precioItem.encuesta.marca_comercial : null,
      username: precioItem.usuario ? precioItem.usuario.username : null,
    }));

    res.json(precioItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchPrecioId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const precioItems = await PrecioModel.findAll({
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

    const precioItemsConDatos = precioItems.map(precioItem => ({
      ID: precioItem.ID,
      createdAt: precioItem.createdAt,
      updatedAt: precioItem.updatedAt,
      tipo_entradas: precioItem.tipo_entradas,
      precio_anticipada: precioItem.precio_anticipada,
      precio_taquilla: precioItem.precio_taquilla,
      descuentos: precioItem.descuentos,
      lista_puerta: precioItem.lista_puerta,
      lista_puerta_cond: precioItem.lista_puerta_cond,
      precio_agua: precioItem.precio_agua,
      precio_refresco: precioItem.precio_refresco,
      precio_cerveza: precioItem.precio_cerveza,
      precio_combinado: precioItem.precio_combinado,
      precio_combinado_prem: precioItem.precio_combinado_prem,
      precio_chupito: precioItem.precio_chupito,
      precio_botella: precioItem.precio_botella,
      precio_mesa: precioItem.precio_mesa,
      precio_guardarropia: precioItem.precio_guardarropia,
      precio_marchandising: precioItem.precio_marchandising,
      precio_otros: precioItem.precio_otros,
      observ_precios: precioItem.observ_precios,
      turistas_porc: precioItem.turistas_porc,
      turistic_pers_idiomas: precioItem.turistic_pers_idiomas,
      turistic_pers_idiomas_cual_ingles: precioItem.turistic_pers_idiomas_cual_ingles,
      turistic_pers_idiomas_cual_frances: precioItem.turistic_pers_idiomas_cual_frances,
      turistic_pers_idiomas_cual_otro: precioItem.turistic_pers_idiomas_cual_otro,
      señal_idiomas: precioItem.señal_idiomas,
      señal_idiomas_cual_ingles: precioItem.señal_idiomas_cual_ingles,
      señal_idiomas_cual_frances: precioItem.señal_idiomas_cual_frances,
      señal_idiomas_cual_otro: precioItem.señal_idiomas_cual_otro,
      pers_att_grupos: precioItem.pers_att_grupos,
      pers_att_grupos_cual: precioItem.pers_att_grupos_cual,
      venta_online_idiomas: precioItem.venta_online_idiomas,
      venta_online_idiomas_cual_ingles: precioItem.venta_online_idiomas_cual_ingles,
      venta_online_idiomas_cual_frances: precioItem.venta_online_idiomas_cual_frances,
      venta_online_idiomas_cual_otro: precioItem.venta_online_idiomas_cual_otro,
      Obsrv_att_turist: precioItem.Obsrv_att_turist,
      marca_comercial: precioItem.encuesta ? precioItem.encuesta.marca_comercial : null,
      username: precioItem.usuario ? precioItem.usuario.username : null,
    }));

    res.json(precioItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
