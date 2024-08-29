// controllers/encuestaController.js
import InstalacionesModel from '../models/InstalacionesModel.js';
import Instalacion from '../models/InstalacionesModel.js';
import UserModel from '../models/UserModel.js';
import { Op } from 'sequelize';
import EncuestaModel from '../models/EncuestaModel.js';

export const getAllInstalaciones = async (req, res) => {
    try {
      const instalaciones = await Instalacion.findAll();
      res.status(200).json(instalaciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las encuestas.' });
    }
  };

  export const getIdInstalaciones = async (req, res) => {
    const instalacionId = req.params.id;
  
    try {
      const instalacion = await Instalacion.findByPk(instalacionId);
  
      if (!instalacion) {
        return res.status(404).json({ error: 'Encuesta no encontrada.' });
      }
  
      res.status(200).json(instalacion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la encuesta.' });
    }
  };

  export const createInstalacion = async (req, res) => {
    const nuevaInstalacion = req.body;
  
    try {
      const instalacionCreada = await Instalacion.create(nuevaInstalacion);
      res.status(201).json(instalacionCreada);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la encuesta.' });
    }
  };

  export const updateInstalacion = async (req, res) => {
    const instalacionId = req.params.id;
    const datosActualizados = req.body;
  
    try {
      const instalacion = await Instalacion.findByPk(instalacionId);
  
      if (!instalacion) {
        return res.status(404).json({ error: 'Encuesta no encontrada.' });
      }
  
      await instalacion.update(datosActualizados);
      res.status(200).json(instalacion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar la encuesta.' });
    }
  };

  export const searchInstalacion = async (req, res) => {
    const { createdAt, marca_comercial } = req.query;
  
    try {
      const instalaciones = await InstalacionesModel.findAll({
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
    const instalacionesConDatos = instalaciones.map(instalacion => ({
          ID: instalacion.ID,
          createdAt: instalacion.createdAt,
          updatedAt: instalacion.updatedAt,
          pista: instalacion.pista,
  escenario: instalacion.escenario,
  zonamesas: instalacion.zonamesas,
  perc_mesas: instalacion.perc_mesas,
  barras: instalacion.barras,
  barrasmetros: instalacion.barrasmetros,
  barraspersons: instalacion.barraspersons,
  decoracion: instalacion.decoracion,
  climatizacion: instalacion.climatizacion,
  climat_temp: instalacion.climat_temp,
  limp_durante: instalacion.limp_durante,
  limp_ensesion: instalacion.limp_ensesion,
  Mantenimiento: instalacion.Mantenimiento,
  Observ_instal: instalacion.Observ_instal,
          marca_comercial: instalacion.encuesta ? instalacion.encuesta.marca_comercial : null,
        username: instalacion.usuario ? instalacion.usuario.username : null,
        }));
  
      res.json(instalacionesConDatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const searchInstalacionId = async (req, res) => {
    const { createdAt, marca_comercial } = req.query;
    const userId = req.params.user_id;
  
    try {
      const instalaciones = await InstalacionesModel.findAll({
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
    const instalacionesConDatos = instalaciones.map(instalacion => ({
          ID: instalacion.ID,
          createdAt: instalacion.createdAt,
          updatedAt: instalacion.updatedAt,
          pista: instalacion.pista,
  escenario: instalacion.escenario,
  zonamesas: instalacion.zonamesas,
  perc_mesas: instalacion.perc_mesas,
  barras: instalacion.barras,
  barrasmetros: instalacion.barrasmetros,
  barraspersons: instalacion.barraspersons,
  decoracion: instalacion.decoracion,
  climatizacion: instalacion.climatizacion,
  climat_temp: instalacion.climat_temp,
  limp_durante: instalacion.limp_durante,
  limp_ensesion: instalacion.limp_ensesion,
  Mantenimiento: instalacion.Mantenimiento,
  Observ_instal: instalacion.Observ_instal,
          marca_comercial: instalacion.encuesta ? instalacion.encuesta.marca_comercial : null,
        username: instalacion.usuario ? instalacion.usuario.username : null,
        }));
  
      res.json(instalacionesConDatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };