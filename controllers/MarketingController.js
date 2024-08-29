// controllers/marketingController.js
import MarketingModel from '../models/MarketingModel.js';
import UserModel from '../models/UserModel.js';
import EncuestaModel from '../models/EncuestaModel.js';
import { Op } from 'sequelize';

export const getAllMarketing = async (req, res) => {
  try {
    const marketingItems = await MarketingModel.findAll();
    res.status(200).json(marketingItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las encuestas de marketing.' });
  }
};

export const getMarketingById = async (req, res) => {
  const marketingId = req.params.id;

  try {
    const marketingItem = await MarketingModel.findByPk(marketingId);

    if (!marketingItem) {
      return res.status(404).json({ error: 'Encuesta de marketing no encontrada.' });
    }

    res.status(200).json(marketingItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la encuesta de marketing.' });
  }
};

export const createMarketing = async (req, res) => {
  const nuevaEncuestaMarketing = req.body;

  try {
    const marketingCreado = await MarketingModel.create(nuevaEncuestaMarketing);
    res.status(201).json(marketingCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la encuesta de marketing.' });
  }
};

export const updateMarketing = async (req, res) => {
  const marketingId = req.params.id;
  const datosActualizados = req.body;

  try {
    const marketingItem = await MarketingModel.findByPk(marketingId);

    if (!marketingItem) {
      return res.status(404).json({ error: 'Encuesta de marketing no encontrada.' });
    }

    await marketingItem.update(datosActualizados);
    res.status(200).json(marketingItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la encuesta de marketing.' });
  }
};

export const searchMarketing = async (req, res) => {
    const { createdAt, marca_comercial } = req.query;
  
    try {
      const marketingItems = await MarketingModel.findAll({
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
  
      const marketingItemsConDatos = marketingItems.map(marketingItem => ({
        ID: marketingItem.ID,
        createdAt: marketingItem.createdAt,
        updatedAt: marketingItem.updatedAt,
        link_drive: marketingItem.link_drive,
        web_activo: marketingItem.web_activo ? 'Si' : 'No',
        quienes_somos: marketingItem.quienes_somos ? 'Si' : 'No',
        servicios: marketingItem.servicios ? 'Si' : 'No',
        eventos: marketingItem.eventos ? 'Si' : 'No',
        contacto: marketingItem.contacto ? 'Si' : 'No',
        facebbok: marketingItem.facebbok ? 'Si' : 'No',
        facebook_act: marketingItem.facebook_act ? 'Si' : 'No',
        facebook_publ_mes: marketingItem.facebook_publ_mes,
        instagram: marketingItem.instagram  ? 'Si' : 'No',
        instagram_act: marketingItem.instagram_act ? 'Si' : 'No',
        instagram_publ_mes: marketingItem.instagram_publ_mes,
        otras_redes: marketingItem.otras_redes ? 'Si' : 'No',
            otras_redes_cual: marketingItem.otras_redes_cual,
            otras_redes_act: marketingItem.otras_redes_act ? 'Si' : 'No',
            otras_redes_publ_mes: marketingItem.otras_redes_publ_mes,
            ficha_google: marketingItem.ficha_google ? 'Si' : 'No',
            ficha_google_control: marketingItem.ficha_google_control ? 'Si' : 'No',
            ficha_google_ubica: marketingItem.ficha_google_ubica ? 'Si' : 'No',
            ficha_google_hora: marketingItem.ficha_google_hora ? 'Si' : 'No',
            ficha_google_desc: marketingItem.ficha_google_desc ? 'Si' : 'No',
            ficha_google_serv: marketingItem.ficha_google_serv ? 'Si' : 'No',
            venta_entradas: marketingItem.venta_entradas ? 'Si' : 'No',
            plataf_vta_entr_name: marketingItem.plataf_vta_entr_name,
            plataf_vta_entr_accweb: marketingItem.plataf_vta_entr_accweb ? 'Si' : 'No',
            plataf_vta_entr_accrrss: marketingItem.plataf_vta_entr_accrrss ? 'Si' : 'No',
            plataf_vta_entr_o: marketingItem.plataf_vta_entr_o ? 'Si' : 'No',
            plataf_vta_entr_name_o: marketingItem.plataf_vta_entr_name_o,
            plataf_vta_entr_accweb_o: marketingItem.plataf_vta_entr_accweb_o ? 'Si' : 'No',
            plataf_vta_entr_accrrss_o: marketingItem.plataf_vta_entr_accrrss_o ? 'Si' : 'No',
            reserva_online: marketingItem.reserva_online ? 'Si' : 'No',
            reserva_online_name: marketingItem.reserva_online_name,
            reserva_online_accweb: marketingItem.reserva_online_accweb ? 'Si' : 'No',
            reserva_online_accrrss: marketingItem.reserva_online_accrrss ? 'Si' : 'No',
            reserva_lista_puerta: marketingItem.reserva_lista_puerta ? 'Si' : 'No',
            reserva_lista_pta_web: marketingItem.reserva_lista_pta_web ? 'Si' : 'No',
            reserva_lista_pta_rrss: marketingItem.reserva_lista_pta_rrss ? 'Si' : 'No',
            reserva_lista_pta_tel: marketingItem.reserva_lista_pta_tel ? 'Si' : 'No',
            reserva_lista_pta_rrpp: marketingItem.reserva_lista_pta_rrpp ? 'Si' : 'No',
            reserva_mesa: marketingItem.reserva_mesa ? 'Si' : 'No',
            reserva_mesa_web: marketingItem.reserva_mesa_web ? 'Si' : 'No',
            reserva_mesa_rrss: marketingItem.reserva_mesa_rrss ? 'Si' : 'No',
            reserva_mesa_tel: marketingItem.reserva_mesa_tel ? 'Si' : 'No',
            reserva_mesa_rrpp: marketingItem.reserva_mesa_rrpp ? 'Si' : 'No',
            Observ_marketing: marketingItem?.Observ_marketing,
        marca_comercial: marketingItem.encuesta ? marketingItem.encuesta.marca_comercial : null,
        username: marketingItem.usuario ? marketingItem.usuario.username : null,
      }));
  
      res.json(marketingItemsConDatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  export const searchMarketingId = async (req, res) => {
    const { createdAt, marca_comercial } = req.query;
    const userId = req.params.user_id;
  
    try {
      const marketingItems = await MarketingModel.findAll({
        where: {
          user_id:userId,
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
  
      const marketingItemsConDatos = marketingItems.map(marketingItem => ({
        ID: marketingItem.ID,
        createdAt: marketingItem.createdAt,
        updatedAt: marketingItem.updatedAt,
        link_drive: marketingItem.link_drive,
        web_activo: marketingItem.web_activo ? 'Si' : 'No',
        quienes_somos: marketingItem.quienes_somos ? 'Si' : 'No',
        servicios: marketingItem.servicios ? 'Si' : 'No',
        eventos: marketingItem.eventos ? 'Si' : 'No',
        contacto: marketingItem.contacto ? 'Si' : 'No',
        facebbok: marketingItem.facebbok ? 'Si' : 'No',
        facebook_act: marketingItem.facebook_act ? 'Si' : 'No',
        facebook_publ_mes: marketingItem.facebook_publ_mes,
        instagram: marketingItem.instagram  ? 'Si' : 'No',
        instagram_act: marketingItem.instagram_act ? 'Si' : 'No',
        instagram_publ_mes: marketingItem.instagram_publ_mes,
        otras_redes: marketingItem.otras_redes ? 'Si' : 'No',
            otras_redes_cual: marketingItem.otras_redes_cual,
            otras_redes_act: marketingItem.otras_redes_act ? 'Si' : 'No',
            otras_redes_publ_mes: marketingItem.otras_redes_publ_mes,
            ficha_google: marketingItem.ficha_google ? 'Si' : 'No',
            ficha_google_control: marketingItem.ficha_google_control ? 'Si' : 'No',
            ficha_google_ubica: marketingItem.ficha_google_ubica ? 'Si' : 'No',
            ficha_google_hora: marketingItem.ficha_google_hora ? 'Si' : 'No',
            ficha_google_desc: marketingItem.ficha_google_desc ? 'Si' : 'No',
            ficha_google_serv: marketingItem.ficha_google_serv ? 'Si' : 'No',
            venta_entradas: marketingItem.venta_entradas ? 'Si' : 'No',
            plataf_vta_entr_name: marketingItem.plataf_vta_entr_name,
            plataf_vta_entr_accweb: marketingItem.plataf_vta_entr_accweb ? 'Si' : 'No',
            plataf_vta_entr_accrrss: marketingItem.plataf_vta_entr_accrrss ? 'Si' : 'No',
            plataf_vta_entr_o: marketingItem.plataf_vta_entr_o ? 'Si' : 'No',
            plataf_vta_entr_name_o: marketingItem.plataf_vta_entr_name_o,
            plataf_vta_entr_accweb_o: marketingItem.plataf_vta_entr_accweb_o ? 'Si' : 'No',
            plataf_vta_entr_accrrss_o: marketingItem.plataf_vta_entr_accrrss_o ? 'Si' : 'No',
            reserva_online: marketingItem.reserva_online ? 'Si' : 'No',
            reserva_online_name: marketingItem.reserva_online_name,
            reserva_online_accweb: marketingItem.reserva_online_accweb ? 'Si' : 'No',
            reserva_online_accrrss: marketingItem.reserva_online_accrrss ? 'Si' : 'No',
            reserva_lista_puerta: marketingItem.reserva_lista_puerta ? 'Si' : 'No',
            reserva_lista_pta_web: marketingItem.reserva_lista_pta_web ? 'Si' : 'No',
            reserva_lista_pta_rrss: marketingItem.reserva_lista_pta_rrss ? 'Si' : 'No',
            reserva_lista_pta_tel: marketingItem.reserva_lista_pta_tel ? 'Si' : 'No',
            reserva_lista_pta_rrpp: marketingItem.reserva_lista_pta_rrpp ? 'Si' : 'No',
            reserva_mesa: marketingItem.reserva_mesa ? 'Si' : 'No',
            reserva_mesa_web: marketingItem.reserva_mesa_web ? 'Si' : 'No',
            reserva_mesa_rrss: marketingItem.reserva_mesa_rrss ? 'Si' : 'No',
            reserva_mesa_tel: marketingItem.reserva_mesa_tel ? 'Si' : 'No',
            reserva_mesa_rrpp: marketingItem.reserva_mesa_rrpp ? 'Si' : 'No',
            Observ_marketing: marketingItem?.Observ_marketing,
        marca_comercial: marketingItem.encuesta ? marketingItem.encuesta.marca_comercial : null,
        username: marketingItem.usuario ? marketingItem.usuario.username : null,
      }));
  
      res.json(marketingItemsConDatos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
