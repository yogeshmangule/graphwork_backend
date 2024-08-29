// controllers/espectaculoController.js
import EspectaculoModel from '../models/EspectaculoModel.js';
import UserModel from '../models/UserModel.js';
import { Op } from 'sequelize';
import EncuestaModel from '../models/EncuestaModel.js';

export const getAllEspectaculos = async (req, res) => {
  try {
    const espectaculoItems = await EspectaculoModel.findAll();
    res.status(200).json(espectaculoItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de espectáculo.' });
  }
};

export const getEspectaculoById = async (req, res) => {
  const espectaculoId = req.params.id;

  try {
    const espectaculoItem = await EspectaculoModel.findByPk(espectaculoId);

    if (!espectaculoItem) {
      return res.status(404).json({ error: 'Encuesta de espectáculo no encontrada.' });
    }

    res.status(200).json(espectaculoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de espectáculo.' });
  }
};

export const createEspectaculo = async (req, res) => {
  const nuevoEspectaculo = req.body;

  try {
    const espectaculoCreado = await EspectaculoModel.create(nuevoEspectaculo);
    res.status(201).json(espectaculoCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de espectáculo.' });
  }
};

export const updateEspectaculo = async (req, res) => {
  const espectaculoId = req.params.id;
  const datosActualizados = req.body;

  try {
    const espectaculoItem = await EspectaculoModel.findByPk(espectaculoId);

    if (!espectaculoItem) {
      return res.status(404).json({ error: 'Encuesta de espectáculo no encontrada.' });
    }

    await espectaculoItem.update(datosActualizados);
    res.status(200).json(espectaculoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de espectáculo.' });
  }
};

export const searchEspectaculo = async (req, res) => {
    const { createdAt, amb_musical_no } = req.query;
  
    try {
      const espectaculoItems = await EspectaculoModel.findAll({
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
                [Op.like]: `%${amb_musical_no || ''}%`,
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
  
      const espectaculoItemsConDatos = espectaculoItems.map(espectaculoItem => ({
        ID: espectaculoItem.ID,
        createdAt: espectaculoItem.createdAt,
        updatedAt: espectaculoItem.updatedAt,
        amb_musical_no: espectaculoItem?.amb_musical_no ? 'No' : null,
        amb_musical_residente: espectaculoItem?.amb_musical_residente ? 'Residente' : null,
        amb_musical_playlist: espectaculoItem?.amb_musical_playlist ? 'PlayList' : null,
        amb_musical_liveset: espectaculoItem?.amb_musical_liveset ? 'Live Set' : null,
        amb_musical_gruposm: espectaculoItem?.amb_musical_gruposm ? 'Grupos Músicales' : null,
        estilo_musical_comercial: espectaculoItem?.estilo_musical_comercial ? 'Comercial y Grandes Éxitos' : null,
        estilo_musical_reggaeton: espectaculoItem?.estilo_musical_reggaeton ? 'Reggaetón y Urbana' : null,
        estilo_musical_electro: espectaculoItem?.estilo_musical_electro ? 'Electrónica' : null,
        estilo_musical_remember: espectaculoItem?.estilo_musical_remember ? 'Remember' : null,
        estilo_musical_otro: espectaculoItem?.estilo_musical_otro,
        volumen_musica: espectaculoItem?.volumen_musica,
        animacion: espectaculoItem?.animacion,
        visuales: espectaculoItem?.visuales ? 'Si' : 'No',
        visuales_si_efecto: espectaculoItem?.visuales_si_efecto ? 'Efectos de iluminación' : null,
        visuales_si_proyeccion: espectaculoItem?.visuales_si_proyeccion ? 'Proyección en las paredes' : null,
        visuales_si_pantalla: espectaculoItem?.visuales_si_pantalla ? 'Pantallas de plasma' : null,
        bengalas: espectaculoItem?.bengalas ? 'Si' : 'No',
        bengalas_si_uso_mesas: espectaculoItem?.bengalas_si_uso_mesas ? 'Uso en mesas' : null,
        bengalas_si_uso_eqipos: espectaculoItem?.bengalas_si_uso_eqipos ? 'Uso equipo animación' : null,
        bengalas_si_uso_publico: espectaculoItem?.bengalas_si_uso_publico ? 'Uso por público' : null,
        ropia: espectaculoItem?.ropia ? 'Si' : 'No',
        ropia_precio: espectaculoItem?.ropia_precio,
        ropia_estado: espectaculoItem?.ropia_estado,
        observ_espectaculos: espectaculoItem?.observ_espectaculos,
        marca_comercial: espectaculoItem.encuesta ? espectaculoItem.encuesta.marca_comercial : null,
        username: espectaculoItem.usuario ? espectaculoItem.usuario.username : null,
      }));
  
      res.json(espectaculoItemsConDatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const searchEspectaculoId = async (req, res) => {
    const { createdAt, amb_musical_no } = req.query;
    const userId = req.params.user_id;
  
    try {
      const espectaculoItems = await EspectaculoModel.findAll({
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
                [Op.like]: `%${amb_musical_no || ''}%`,
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
  
      const espectaculoItemsConDatos = espectaculoItems.map(espectaculoItem => ({
        ID: espectaculoItem.ID,
        createdAt: espectaculoItem.createdAt,
        updatedAt: espectaculoItem.updatedAt,
        amb_musical_no: espectaculoItem?.amb_musical_no ? 'No' : null,
        amb_musical_residente: espectaculoItem?.amb_musical_residente ? 'Residente' : null,
        amb_musical_playlist: espectaculoItem?.amb_musical_playlist ? 'PlayList' : null,
        amb_musical_liveset: espectaculoItem?.amb_musical_liveset ? 'Live Set' : null,
        amb_musical_gruposm: espectaculoItem?.amb_musical_gruposm ? 'Grupos Músicales' : null,
        estilo_musical_comercial: espectaculoItem?.estilo_musical_comercial ? 'Comercial y Grandes Éxitos' : null,
        estilo_musical_reggaeton: espectaculoItem?.estilo_musical_reggaeton ? 'Reggaetón y Urbana' : null,
        estilo_musical_electro: espectaculoItem?.estilo_musical_electro ? 'Electrónica' : null,
        estilo_musical_remember: espectaculoItem?.estilo_musical_remember ? 'Remember' : null,
        estilo_musical_otro: espectaculoItem?.estilo_musical_otro,
        volumen_musica: espectaculoItem?.volumen_musica,
        animacion: espectaculoItem?.animacion,
        visuales: espectaculoItem?.visuales ? 'Si' : 'No',
        visuales_si_efecto: espectaculoItem?.visuales_si_efecto ? 'Efectos de iluminación' : null,
        visuales_si_proyeccion: espectaculoItem?.visuales_si_proyeccion ? 'Proyección en las paredes' : null,
        visuales_si_pantalla: espectaculoItem?.visuales_si_pantalla ? 'Pantallas de plasma' : null,
        bengalas: espectaculoItem?.bengalas ? 'Si' : 'No',
        bengalas_si_uso_mesas: espectaculoItem?.bengalas_si_uso_mesas ? 'Uso en mesas' : null,
        bengalas_si_uso_eqipos: espectaculoItem?.bengalas_si_uso_eqipos ? 'Uso equipo animación' : null,
        bengalas_si_uso_publico: espectaculoItem?.bengalas_si_uso_publico ? 'Uso por público' : null,
        ropia: espectaculoItem?.ropia ? 'Si' : 'No',
        ropia_precio: espectaculoItem?.ropia_precio,
        ropia_estado: espectaculoItem?.ropia_estado,
        observ_espectaculos: espectaculoItem?.observ_espectaculos,
        marca_comercial: espectaculoItem.encuesta ? espectaculoItem.encuesta.marca_comercial : null,
        username: espectaculoItem.usuario ? espectaculoItem.usuario.username : null,
      }));
  
      res.json(espectaculoItemsConDatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };