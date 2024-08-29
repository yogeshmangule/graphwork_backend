import PersonalModel from '../models/PersonalModel.js';
import UserModel from '../models/UserModel.js';
import { Op } from 'sequelize';
import EncuestaModel from '../models/EncuestaModel.js';

export const getAllPersonal = async (req, res) => {
  try {
    const personal = await PersonalModel.findAll();
    res.status(200).json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos personales.' });
  }
};

export const getIdPersonal = async (req, res) => {
  const personalId = req.params.id;

  try {
    const personal = await PersonalModel.findByPk(personalId);

    if (!personal) {
      return res.status(404).json({ error: 'Datos personales no encontrados.' });
    }

    res.status(200).json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos personales.' });
  }
};

export const createPersonal = async (req, res) => {
  const nuevoPersonal = req.body;

  try {
    const personalCreado = await PersonalModel.create(nuevoPersonal);
    res.status(201).json(personalCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear los datos personales.' });
  }
};

export const updatePersonal = async (req, res) => {
  const personalId = req.params.id;
  const datosActualizados = req.body;

  try {
    const personal = await PersonalModel.findByPk(personalId);

    if (!personal) {
      return res.status(404).json({ error: 'Datos personales no encontrados.' });
    }

    await personal.update(datosActualizados);
    res.status(200).json(personal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar los datos personales.' });
  }
};

export const searchPersonal = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;

  try {
    const personalData = await PersonalModel.findAll({
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

    const personalConDatos = personalData.map(personal => ({
        ID: personal.ID,
        createdAt: personal.createdAt,
        updatedAt: personal.updatedAt,
        pers_seguridad: personal.pers_seguridad,
        pers_seg_imagen: personal.pers_seg_imagen,
        pers_seg_actitud: personal.pers_seg_actitud,
        pers_seg_idioma_ingles: personal?.pers_seg_idioma_ingles  ? 'Ingles' : null,
        pers_seg_idioma_frances: personal?.pers_seg_idioma_frances  ? 'Fránces' : null,
        pers_seg_idioma_otra: personal.pers_seg_idioma_otra,
        pers_barra: personal.pers_barra,
        pers_barra_imagen: personal.pers_barra_imagen,
        pers_barra_actitud: personal.pers_barra_actitud,
        pers_barra_idioma_ingles: personal?.pers_barra_idioma_ingles  ? 'Ingles' : null,
        pers_barra_idioma_frances: personal?.pers_barra_idioma_frances ? 'Fránces' : null,
        pers_barra_idioma_otro: personal.pers_barra_idioma_otro,
        pers_cocteleria: personal?.pers_cocteleria  ? 'Si' : 'No',
        observ_personal: personal.observ_personal,
        marca_comercial: personal.encuesta ? personal.encuesta.marca_comercial : null,
        username: personal.usuario ? personal.usuario.username : null,
    }));

    res.json(personalConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const searchPersonalId = async (req, res) => {
  const { createdAt, marca_comercial } = req.query;
  const userId = req.params.user_id;

  try {
    const personalData = await PersonalModel.findAll({
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

    const personalConDatos = personalData.map(personal => ({
        ID: personal.ID,
        createdAt: personal.createdAt,
        updatedAt: personal.updatedAt,
        pers_seguridad: personal.pers_seguridad,
        pers_seg_imagen: personal.pers_seg_imagen,
        pers_seg_actitud: personal.pers_seg_actitud,
        pers_seg_idioma_ingles: personal?.pers_seg_idioma_ingles  ? 'Ingles' : null,
        pers_seg_idioma_frances: personal?.pers_seg_idioma_frances  ? 'Fránces' : null,
        pers_seg_idioma_otra: personal.pers_seg_idioma_otra,
        pers_barra: personal.pers_barra,
        pers_barra_imagen: personal.pers_barra_imagen,
        pers_barra_actitud: personal.pers_barra_actitud,
        pers_barra_idioma_ingles: personal?.pers_barra_idioma_ingles  ? 'Ingles' : null,
        pers_barra_idioma_frances: personal?.pers_barra_idioma_frances ? 'Fránces' : null,
        pers_barra_idioma_otro: personal.pers_barra_idioma_otro,
        pers_cocteleria: personal?.pers_cocteleria  ? 'Si' : 'No',
        observ_personal: personal.observ_personal,
        marca_comercial: personal.encuesta ? personal.encuesta.marca_comercial : null,
        username: personal.usuario ? personal.usuario.username : null,
    }));

    res.json(personalConDatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
