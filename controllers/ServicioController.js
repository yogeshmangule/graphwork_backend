// controllers/servicioController.js
import ServicioModel from '../models/ServicioModel.js';
import UserModel from '../models/UserModel.js';
import { Op } from 'sequelize';
import EncuestaModel from '../models/EncuestaModel.js';

export const getAllServicios = async (req, res) => {
  try {
    const servicioItems = await ServicioModel.findAll();
    res.status(200).json(servicioItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de servicio.' });
  }
};

export const getServicioById = async (req, res) => {
  const servicioId = req.params.id;

  try {
    const servicioItem = await ServicioModel.findByPk(servicioId);

    if (!servicioItem) {
      return res.status(404).json({ error: 'Encuesta de servicio no encontrada.' });
    }

    res.status(200).json(servicioItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de servicio.' });
  }
};

export const createServicio = async (req, res) => {
  const nuevoServicio = req.body;

  try {
    const servicioCreado = await ServicioModel.create(nuevoServicio);
    res.status(201).json(servicioCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de servicio.' });
  }
};

export const updateServicio = async (req, res) => {
  const servicioId = req.params.id;
  const datosActualizados = req.body;

  try {
    const servicioItem = await ServicioModel.findByPk(servicioId);

    if (!servicioItem) {
      return res.status(404).json({ error: 'Encuesta de servicio no encontrada.' });
    }

    await servicioItem.update(datosActualizados);
    res.status(200).json(servicioItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de servicio.' });
  }
};

export const searchServicio = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const servicioItems = await ServicioModel.findAll({
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

    const servicioItemsConDatos = servicioItems.map(servicioItem => ({
      ID: servicioItem.ID,
      createdAt: servicioItem.createdAt,
      updatedAt: servicioItem.updatedAt,
      marca_bebidas_premium: servicioItem?.marca_bebidas_premium ? 'Premium' : null,
      marca_bebidas_standar: servicioItem?.marca_bebidas_standar? 'Marca Estándar' : null,
      marca_bebidas_blancas: servicioItem?.marca_bebidas_blancas ? 'Marcas Blancas' : null,
      marca_bebidas_otras: servicioItem?.marca_bebidas_otra,
      vajilla_tubo_extra: servicioItem?.vajilla_tubo_extra ? 'Vaso tubo extra' : null,
      vajilla_tubo_standar: servicioItem?.vajilla_tubo_standar ? 'Vaso tubo estándar' : null,
      vajilla_copa_balon: servicioItem?.vajilla_copa_balon ? 'Copa balón' : null,
      vajilla_sidra: servicioItem?.vajilla_sidra ? 'Vaso sidra' : null,
      vajilla_plastico: servicioItem?.vajilla_plastico ? 'Vasos plástico' : null,
      vajilla_otras: servicioItem?.vajilla_otras,
      hielo: servicioItem.hielo,
      refresco: servicioItem.refresco,
      amabilidad: servicioItem.amabilidad,
      esperabarra: servicioItem.esperabarra,
      disp_alimentos: servicioItem.disp_alimentos,
      mesas_reservados: servicioItem?.mesas_reservados ? 'Si' : 'No',
      mesas_num: servicioItem.mesas_num,
      mesas_percent: servicioItem.mesas_percent,
      venta_botellas: servicioItem?.venta_botellas ? 'Si' : 'No',
      shisas: servicioItem?.shisas ? 'Si' : 'No',
      observ_servicio: servicioItem.observ_servicio,
      marca_comercial: servicioItem.encuesta ? servicioItem.encuesta.marca_comercial : null,
      username: servicioItem.usuario ? servicioItem.usuario.username : null,
    }));

    res.json(servicioItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchServicioId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const servicioItems = await ServicioModel.findAll({
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

    const servicioItemsConDatos = servicioItems.map(servicioItem => ({
      ID: servicioItem.ID,
      createdAt: servicioItem.createdAt,
      updatedAt: servicioItem.updatedAt,
      marca_bebidas_premium: servicioItem?.marca_bebidas_premium ? 'Premium' : null,
      marca_bebidas_standar: servicioItem?.marca_bebidas_standar? 'Marca Estándar' : null,
      marca_bebidas_blancas: servicioItem?.marca_bebidas_blancas ? 'Marcas Blancas' : null,
      marca_bebidas_otras: servicioItem?.marca_bebidas_otra,
      vajilla_tubo_extra: servicioItem?.vajilla_tubo_extra ? 'Vaso tubo extra' : null,
      vajilla_tubo_standar: servicioItem?.vajilla_tubo_standar ? 'Vaso tubo estándar' : null,
      vajilla_copa_balon: servicioItem?.vajilla_copa_balon ? 'Copa balón' : null,
      vajilla_sidra: servicioItem?.vajilla_sidra ? 'Vaso sidra' : null,
      vajilla_plastico: servicioItem?.vajilla_plastico ? 'Vasos plástico' : null,
      vajilla_otras: servicioItem?.vajilla_otras,
      hielo: servicioItem.hielo,
      refresco: servicioItem.refresco,
      amabilidad: servicioItem.amabilidad,
      esperabarra: servicioItem.esperabarra,
      disp_alimentos: servicioItem.disp_alimentos,
      mesas_reservados: servicioItem?.mesas_reservados ? 'Si' : 'No',
      mesas_num: servicioItem.mesas_num,
      mesas_percent: servicioItem.mesas_percent,
      venta_botellas: servicioItem?.venta_botellas ? 'Si' : 'No',
      shisas: servicioItem?.shisas ? 'Si' : 'No',
      observ_servicio: servicioItem.observ_servicio,
      marca_comercial: servicioItem.encuesta ? servicioItem.encuesta.marca_comercial : null,
      username: servicioItem.usuario ? servicioItem.usuario.username : null,
    }));

    res.json(servicioItemsConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
