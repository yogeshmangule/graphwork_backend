// import UserModel from '../models/UserModel.js';
// import AmbienteModel from '../models/AmbienteModel.js';
// import BuenaPracticaModel from '../models/BuenaPracticaModel.js';
// import EncuestaModel from '../models/EncuestaModel.js';
// import EntornoModel from '../models/EntornoModel.js';
// import EspectaculoModel from '../models/EspectaculoModel.js';
// import HorarioModel from '../models/HorarioModel.js';
// import InstalacionesModel from '../models/InstalacionesModel.js';
// import MalaPracticaModel from '../models/MalaPracticaModel.js';
// import MarketingModel from '../models/MarketingModel.js';
// import PersonalModelfrom from '../models/PersonalModel.js';
// import PrecioModel from '../models/PrecioModel.js';
// import SeguridadModel from '../models/SeguridadModel.js';
// import ServicioModel from '../models/ServicioModel.js';
// import ValoracionModel from '../models/ValoracionModel.js';


// // Mostrar todos los registros de usuarios
// export const getAllData = async (req, res) => {
//     try {
//         const users = await EspectaculoModel.findAll({
//             order: [
//                 ['createdAt', 'DESC'],
//             ],
//         });
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

import sequelize from '../database/db.js';
import UserModel from '../models/UserModel.js';
import AmbienteModel from '../models/AmbienteModel.js';
import BuenaPracticaModel from '../models/BuenaPracticaModel.js';
import EncuestaModel from '../models/EncuestaModel.js';
import EntornoModel from '../models/EntornoModel.js';
import EspectaculoModel from '../models/EspectaculoModel.js';
import HorarioModel from '../models/HorarioModel.js';
import InstalacionesModel from '../models/InstalacionesModel.js';
import MalaPracticaModel from '../models/MalaPracticaModel.js';
import MarketingModel from '../models/MarketingModel.js';
import PersonalModel from '../models/PersonalModel.js';
import PrecioModel from '../models/PrecioModel.js';
import SeguridadModel from '../models/SeguridadModel.js';
import ServicioModel from '../models/ServicioModel.js';
import ValoracionModel from '../models/ValoracionModel.js';

export const getAllData = async (req, res) => {
    try {
        const data = {};

        // Fetching data for FICHA_ENCUESTA
        data['FICHA_ENCUESTA'] = {};
        data['FICHA_ENCUESTA']['licenciadata'] = await EncuestaModel.findAll({
            attributes: [
                'licencia',
                [sequelize.fn('COUNT', sequelize.col('licencia')), 'count']
            ],
            group: ['licencia']
        });

        data['FICHA_ENCUESTA']['dimensionesdata'] = await EncuestaModel.findAll({
            attributes: [
                'dimensiones',
                [sequelize.fn('COUNT', sequelize.col('dimensiones')), 'count']
            ],
            group: ['dimensiones']
        });

        // Fetching data for Horarios
        data['horarios'] = {};
        const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
        for (const day of days) {
            data['horarios'][`hora${day}de`] = await HorarioModel.findAll({
                attributes: [
                    `hora${day}de`,
                    [sequelize.fn('COUNT', sequelize.col(`hora${day}de`)), 'count']
                ],
                group: [`hora${day}de`]
            });

            data['horarios'][`hora${day}a`] = await HorarioModel.findAll({
                attributes: [
                    `hora${day}a`,
                    [sequelize.fn('COUNT', sequelize.col(`hora${day}a`)), 'count']
                ],
                group: [`hora${day}a`]
            });
        }

        // Fetching data for FICHA_AMBIENTE
        data['FICHA_AMBIENTE'] = {};
        const ambientes = ['musicaL', 'musicaM', 'musicaX', 'MusicaJ', 'musicaV', 'musicaS', 'musicaD', 'edad', 'poder', 'aspecto'];
        for (const ambiente of ambientes) {
            data['FICHA_AMBIENTE'][`${ambiente}data`] = await AmbienteModel.findAll({
                attributes: [
                    ambiente,
                    [sequelize.fn('COUNT', sequelize.col(ambiente)), 'count']
                ],
                group: [ambiente]
            });
        }

        // // Fetching data for Instalaciones
        data['instalaciones_funcionamiento'] = {};
        const instalaciones = ['pista', 'escenario', 'zonamesas', 'perc_mesas', 'barras', 'barrasmetros', 'barraspersons', 'decoracion', 'climatizacion', 'climat_temp', 'limp_durante', 'limp_ensesion', 'mantenimiento'];
        for (const instalacion of instalaciones) {
            data['instalaciones_funcionamiento'][`${instalacion}data`] = await InstalacionesModel.findAll({
                attributes: [
                    instalacion,
                    [sequelize.fn('COUNT', sequelize.col(instalacion)), 'count']
                ],
                group: [instalacion]
            });
        }

        // // Fetching data for FICHA_Seguridad
        data['FICHA_Seguridad'] = {};
        data['FICHA_Seguridad']['evacuation_entry'] = await SeguridadModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN evacuacion_entrada = 1 THEN 1 END')), 'evacuacion_entrada'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN evacuacion_pista = 1 THEN 1 END')), 'evacuacion_pista'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN evacuacion_accesoWC = 1 THEN 1 END')), 'evacuacion_accesoWC'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN evacuacion_barras = 1 THEN 1 END')), 'evacuacion_barras'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN evacuacion_otro = 1 THEN 1 END')), 'evacuacion_otro']
            ]
        });

        data['FICHA_Seguridad']['controlaforo'] = await SeguridadModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN controlaforo IS NULL THEN 1 END')), 'Seleccionar'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN controlaforo = 1 THEN 1 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN controlaforo = 0 THEN 1 END')), 'No']
            ]
        });

        data['FICHA_Seguridad']['hora_actv'] = await SeguridadModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN hora_actv='Por la tarde' THEN 1 END")), 'Porlatarde'],
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN hora_actv = 'De 24:00h a 2:00h' THEN 1 END")), 'De_24_a_2'],
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN hora_actv ='De 2:00h a 4:00h' THEN 1 END")), 'De_2_a_4'],
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN hora_actv ='De 4:00 a cierre' THEN 1 END")), 'De_4_a_cierre']
            ]
        });

        data['FICHA_Seguridad']['camaras'] = await SeguridadModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Camaras = 1 THEN 1 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Camaras = 0 THEN 1 END')), 'No']
            ]
        });

        data['FICHA_Seguridad']['ocupacion'] = await SeguridadModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN ocupacion='Muy saturado' THEN 1 END")), 'Muy_saturado'],
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN ocupacion = 'Bastante saturado' THEN 1 END")), 'Bastante_saturado'],
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN ocupacion ='Poco saturado' THEN 1 END")), 'Poco_saturado'],
                [sequelize.fn('COUNT', sequelize.literal("CASE WHEN ocupacion ='Nada saturado' THEN 1 END")), 'Nada_saturado']
            ]
        });

        data['FICHA_Seguridad']['Sistema_de_pago'] = await SeguridadModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Pago_efectivo=1 THEN 1 END')), 'Pago_efectivo'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Pago_tarjeta =1 THEN 1 END')), 'Pago_tarjeta'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Pago_cashless =1 THEN 1 END')), 'Pago_cashless'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Pago_bizum =1 THEN 1 END')), 'Pago_bizum']
            ]
        });

        data['FICHA_Seguridad']['Cuno'] = await SeguridadModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Cuño = 1 THEN 1 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN Cuño = 0 THEN 1 END')), 'No']
            ]
        });

        // // Fetching data for FICHA_Entorno
        data['FICHA_Entorno'] = {};
        const entornos = ['urbanismo', 'org_colas', 'espera_colas', 'ruido_esterior'];
        for (const entorno of entornos) {
            data['FICHA_Entorno'][`${entorno}data`] = await EntornoModel.findAll({
                attributes: [
                    entorno,
                    [sequelize.fn('COUNT', sequelize.col(entorno)), 'count']
                ],
                group: [entorno]
            });
        }

        data['FICHA_Entorno']['cola_reservas'] = await EntornoModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN cola_reservas=1 THEN 1 END')), 'cola_reservasyes'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN cola_reservas =0 THEN 1 END')), 'cola_reservasno'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN cola_vip =1 THEN 1 END')), 'cola_vipyes'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN cola_vip =0 THEN 1 END')), 'cola_vipno']
            ]
        });

        data['FICHA_Entorno']['botellon_ext'] = await EntornoModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN botellon_ext=1 THEN 1 END')), 'botellon_extyes'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN botellon_ext =0 THEN 1 END')), 'botellon_extno']
            ]
        });

        data['FICHA_Entorno']['protestas'] = await EntornoModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN protestas=1 THEN 1 END')), 'protestasyes'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN protestas =0 THEN 1 END')), 'protestasno']
            ]
        });

        // // Fetching data for FICHA_Servicios
        // data['FICHA_Servicios'] = {};
        // const servicios = ['marca_bebidas_premium', 'vajilla', 'hielo', 'refresco', 'amabilidad', 'esperabarra', 'disp_alimentos', 'mesas_num', 'mesas_percent'];
        // for (const servicio of servicios) {
        //     data['FICHA_Servicios'][`${servicio}data`] = await ServicioModel.findAll({
        //         attributes: [
        //             servicio,
        //             [sequelize.fn('COUNT', sequelize.col(servicio)), 'count']
        //         ],
        //         group: [servicio]
        //     });
        // }

        // data['FICHA_Servicios']['mesas_reservados'] = await ServicioModel.findAll({
        //     attributes: [
        //         [sequelize.fn('COUNT', sequelize.literal('CASE WHEN mesas_reservados=1 THEN 1 END')), 'Si'],
        //         [sequelize.fn('COUNT', sequelize.literal('CASE WHEN mesas_reservados =0 THEN 1 END')), 'No']
        //     ]
        // });

        // data['FICHA_Servicios']['venta_botellas'] = await ServicioModel.findAll({
        //     attributes: [
        //         [sequelize.fn('COUNT', sequelize.literal('CASE WHEN venta_botellas=1 THEN 1 END')), 'Si'],
        //         [sequelize.fn('COUNT', sequelize.literal('CASE WHEN venta_botellas =0 THEN 1 END')), 'No']
        //     ]
        // });

        // data['FICHA_Servicios']['shisas'] = await ServicioModel.findAll({
        //     attributes: [
        //         [sequelize.fn('COUNT', sequelize.literal('CASE WHEN shisas=1 THEN 1 END')), 'Si'],
        //         [sequelize.fn('COUNT', sequelize.literal('CASE WHEN shisas =0 THEN 1 END')), 'No']
        //     ]
        // });

        // Fetching data for FICHA_Servicios
        data['FICHA_Servicios'] = {};

        // Handle marca_bebidas separately
        data['FICHA_Servicios']['marca_bebidas'] = await ServicioModel.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN marca_bebidas_premium = 1 THEN 1 ELSE 0 END')), 'marca_bebidas_premium'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN marca_bebidas_standar = 1 THEN 1 ELSE 0 END')), 'marca_bebidas_standar'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN marca_bebidas_blancas = 1 THEN 1 ELSE 0 END')), 'marca_bebidas_blancas'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN marca_bebidas_otras = 1 THEN 1 ELSE 0 END')), 'marca_bebidas_otras']
            ]
        });

        // Handle vajilla separately
        data['FICHA_Servicios']['vajilla'] = await ServicioModel.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN vajilla_tubo_extra = 1 THEN 1 ELSE 0 END')), 'vajilla_tubo_extra'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN vajilla_tubo_standar = 1 THEN 1 ELSE 0 END')), 'vajilla_tubo_standar'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN vajilla_copa_balon = 1 THEN 1 ELSE 0 END')), 'vajilla_copa_balon'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN vajilla_sidra = 1 THEN 1 ELSE 0 END')), 'vajilla_sidra'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN vajilla_plastico = 1 THEN 1 ELSE 0 END')), 'vajilla_plastico'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN vajilla_otras = 1 THEN 1 ELSE 0 END')), 'vajilla_otras']
            ]
        });

        // Fetch other attributes
        const servicios = ['hielo', 'refresco', 'amabilidad', 'esperabarra', 'disp_alimentos', 'mesas_num', 'mesas_percent'];

        for (const servicio of servicios) {
            data['FICHA_Servicios'][`${servicio}`] = await ServicioModel.findAll({
                attributes: [
                    servicio,
                    [sequelize.fn('COUNT', sequelize.col(servicio)), 'count']
                ],
                group: [servicio]
            });
        }

        data['FICHA_Servicios']['mesas_reservados'] = await ServicioModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN mesas_reservados=1 THEN 1 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN mesas_reservados =0 THEN 1 END')), 'No']
            ]
        });

        data['FICHA_Servicios']['venta_botellas'] = await ServicioModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN venta_botellas=1 THEN 1 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN venta_botellas =0 THEN 1 END')), 'No']
            ]
        });

        data['FICHA_Servicios']['shisas'] = await ServicioModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN shisas=1 THEN 1 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN shisas =0 THEN 1 END')), 'No']
            ]
        });


        // // Fetching data for FICHA_Espectaculos
        data['FICHA_Espectaculos'] = {};

        // Handle amb_musical separately
        data['FICHA_Espectaculos']['amb_musical'] = await EspectaculoModel.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN amb_musical_no = 1 THEN 1 ELSE 0 END')), 'amb_musical_no'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN amb_musical_residente = 1 THEN 1 ELSE 0 END')), 'amb_musical_residente'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN amb_musical_playlist = 1 THEN 1 ELSE 0 END')), 'amb_musical_playlist'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN amb_musical_liveset = 1 THEN 1 ELSE 0 END')), 'amb_musical_liveset'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN amb_musical_gruposm = 1 THEN 1 ELSE 0 END')), 'amb_musical_gruposm']
            ]
        });

        // Handle estilo_musical separately
        data['FICHA_Espectaculos']['estilo_musical'] = await EspectaculoModel.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN estilo_musical_comercial = 1 THEN 1 ELSE 0 END')), 'estilo_musical_comercial'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN estilo_musical_reggaeton = 1 THEN 1 ELSE 0 END')), 'estilo_musical_reggaeton'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN estilo_musical_electro = 1 THEN 1 ELSE 0 END')), 'estilo_musical_electro'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN estilo_musical_remember = 1 THEN 1 ELSE 0 END')), 'estilo_musical_remember'],
                [sequelize.fn('SUM', sequelize.literal('CASE WHEN estilo_musical_otro = 1 THEN 1 ELSE 0 END')), 'estilo_musical_otro']
            ]
        });

        // Handle volumen_musica separately
        data['FICHA_Espectaculos']['volumen_musica'] = await EspectaculoModel.findAll({
            attributes: [
                'volumen_musica',
                [sequelize.fn('COUNT', sequelize.col('volumen_musica')), 'count']
            ],
            group: ['volumen_musica']
        });

        // Handle animacion separately
        data['FICHA_Espectaculos']['animacion'] = await EspectaculoModel.findAll({
            attributes: [
                'animacion',
                [sequelize.fn('COUNT', sequelize.col('animacion')), 'count']
            ],
            group: ['animacion']
        });

        // Handle visuales separately
        data['FICHA_Espectaculos']['visuales'] = await EspectaculoModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN visuales = 1 THEN 1 ELSE 0 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN visuales = 0 THEN 1 ELSE 0 END')), 'No'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN visuales_si_efecto = 1 THEN 1 ELSE 0 END')), 'visuales_si_efecto'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN visuales_si_proyeccion = 1 THEN 1 ELSE 0 END')), 'visuales_si_proyeccion'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN visuales_si_pantalla = 1 THEN 1 ELSE 0 END')), 'visuales_si_pantalla']
            ]
        });

        // Handle bengalas separately
        data['FICHA_Espectaculos']['bengalas'] = await EspectaculoModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN bengalas = 1 THEN 1 ELSE 0 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN bengalas = 0 THEN 1 ELSE 0 END')), 'No'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN bengalas_si_uso_mesas = 1 THEN 1 ELSE 0 END')), 'bengalas_si_uso_mesas'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN bengalas_si_uso_eqipos = 1 THEN 1 ELSE 0 END')), 'bengalas_si_uso_eqipos'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN bengalas_si_uso_publico = 1 THEN 1 ELSE 0 END')), 'bengalas_si_uso_publico']
            ]
        });

        // Handle ropia separately
        data['FICHA_Espectaculos']['ropia'] = await EspectaculoModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN ropia = 1 THEN 1 ELSE 0 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN ropia = 0 THEN 1 ELSE 0 END')), 'No']
            ]
        });

        // Handle ropia_precio separately
        data['FICHA_Espectaculos']['ropia_precio'] = await EspectaculoModel.findAll({
            attributes: [
                'ropia_precio',
                [sequelize.fn('COUNT', sequelize.col('ropia_precio')), 'count']
            ],
            group: ['ropia_precio']
        });

        // Handle ropia_estado separately
        data['FICHA_Espectaculos']['ropia_estado'] = await EspectaculoModel.findAll({
            attributes: [
                'ropia_estado',
                [sequelize.fn('COUNT', sequelize.col('ropia_estado')), 'count']
            ],
            group: ['ropia_estado']
        });

        // // Fetching data for FICHA_personal
        data['FICHA_personal'] = {};
        const personales = ['pers_seguridad', 'pers_seg_imagen', 'pers_seg_actitud', 'pers_barra', 'pers_barra_imagen', 'pers_barra_actitud'];
        for (const personal of personales) {
            data['FICHA_personal'][`${personal}data`] = await PersonalModel.findAll({
                attributes: [
                    personal,
                    [sequelize.fn('COUNT', sequelize.col(personal)), 'count']
                ],
                group: [personal]
            });
        }

        data['FICHA_personal']['pers_seg_idioma'] = await PersonalModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_seg_idioma_ingles=1 THEN 1 END')), 'pers_seg_idioma_ingles'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_seg_idioma_frances =1 THEN 1 END')), 'pers_seg_idioma_frances'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_seg_idioma_otra =1 THEN 1 END')), 'pers_seg_idioma_otra']
            ]
        });

        data['FICHA_personal']['pers_barra_idioma'] = await PersonalModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_barra_idioma_ingles=1 THEN 1 END')), 'pers_barra_idioma_ingles'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_barra_idioma_frances =1 THEN 1 END')), 'pers_barra_idioma_frances'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_barra_idioma_otro =1 THEN 1 END')), 'pers_barra_idioma_otro']
            ]
        });

        data['FICHA_personal']['pers_cocteleria'] = await PersonalModel.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_cocteleria=1 THEN 1 END')), 'Si'],
                [sequelize.fn('COUNT', sequelize.literal('CASE WHEN pers_cocteleria =0 THEN 1 END')), 'No']
            ]
        });

        // Fetching data for FICHA_Marketing 
        data['FICHA_Marketing'] = {};

        const fields = [
            'web_activo', 'quienes_somos', 'servicios', 'eventos', 'contacto', 'facebbok',
            'facebook_act', 'instagram', 'instagram_act', 'otras_redes', 'otras_redes_act',
            'ficha_google', 'ficha_google_control', 'ficha_google_ubica', 'ficha_google_hora',
            'ficha_google_desc', 'ficha_google_serv', 'venta_entradas', 'plataf_vta_entr_accweb',
            'plataf_vta_entr_accrrss', 'plataf_vta_entr_o', 'plataf_vta_entr_accweb_o',
            'plataf_vta_entr_accrrss_o', 'reserva_online_accweb', 'reserva_online_accrrss',
            'reserva_lista_puerta', 'reserva_lista_pta_web', 'reserva_lista_pta_rrss',
            'reserva_lista_pta_tel', 'reserva_lista_pta_rrpp', 'reserva_mesa', 'reserva_mesa_web',
            'reserva_mesa_rrss', 'reserva_mesa_tel', 'reserva_mesa_rrpp'
        ];

        for (const field of fields) {
            data['FICHA_Marketing'][field] = await MarketingModel.findAll({
                attributes: [
                    field,
                    [sequelize.fn('COUNT', sequelize.col(field)), 'count']
                ],
                group: [field]
            });
        }

        // Fields with different structure
        data['FICHA_Marketing']['facebook_publ_mes'] = await MarketingModel.findAll({
            attributes: [
                'facebook_publ_mes',
                [sequelize.fn('COUNT', sequelize.col('facebook_publ_mes')), 'count']
            ],
            group: ['facebook_publ_mes']
        });

        data['FICHA_Marketing']['instagram_publ_mes'] = await MarketingModel.findAll({
            attributes: [
                'instagram_publ_mes',
                [sequelize.fn('COUNT', sequelize.col('instagram_publ_mes')), 'count']
            ],
            group: ['instagram_publ_mes']
        });

        data['FICHA_Marketing']['otras_redes_cual'] = await MarketingModel.findAll({
            attributes: [
                'otras_redes_cual',
                [sequelize.fn('COUNT', sequelize.col('otras_redes_cual')), 'count']
            ],
            group: ['otras_redes_cual']
        });

        data['FICHA_Marketing']['otras_redes_publ_mes'] = await MarketingModel.findAll({
            attributes: [
                'otras_redes_publ_mes',
                [sequelize.fn('COUNT', sequelize.col('otras_redes_publ_mes')), 'count']
            ],
            group: ['otras_redes_publ_mes']
        });

        data['FICHA_Marketing']['plataf_vta_entr_name'] = await MarketingModel.findAll({
            attributes: [
                'plataf_vta_entr_name',
                [sequelize.fn('COUNT', sequelize.col('plataf_vta_entr_name')), 'count']
            ],
            group: ['plataf_vta_entr_name']
        });

        data['FICHA_Marketing']['plataf_vta_entr_name_o'] = await MarketingModel.findAll({
            attributes: [
                'plataf_vta_entr_name_o',
                [sequelize.fn('COUNT', sequelize.col('plataf_vta_entr_name_o')), 'count']
            ],
            group: ['plataf_vta_entr_name_o']
        });

        data['FICHA_Marketing']['reserva_online_name'] = await MarketingModel.findAll({
            attributes: [
                'reserva_online_name',
                [sequelize.fn('COUNT', sequelize.col('reserva_online_name')), 'count']
            ],
            group: ['reserva_online_name']
        });

        data['FICHA_Marketing']['reserva_lista_pta_tel'] = await MarketingModel.findAll({
            attributes: [
                'reserva_lista_pta_tel',
                [sequelize.fn('COUNT', sequelize.col('reserva_lista_pta_tel')), 'count']
            ],
            group: ['reserva_lista_pta_tel']
        });

        data['FICHA_Marketing']['reserva_lista_pta_rrpp'] = await MarketingModel.findAll({
            attributes: [
                'reserva_lista_pta_rrpp',
                [sequelize.fn('COUNT', sequelize.col('reserva_lista_pta_rrpp')), 'count']
            ],
            group: ['reserva_lista_pta_rrpp']
        });

        data['FICHA_Marketing']['reserva_mesa_tel'] = await MarketingModel.findAll({
            attributes: [
                'reserva_mesa_tel',
                [sequelize.fn('COUNT', sequelize.col('reserva_mesa_tel')), 'count']
            ],
            group: ['reserva_mesa_tel']
        });

        data['FICHA_Marketing']['reserva_mesa_rrpp'] = await MarketingModel.findAll({
            attributes: [
                'reserva_mesa_rrpp',
                [sequelize.fn('COUNT', sequelize.col('reserva_mesa_rrpp')), 'count']
            ],
            group: ['reserva_mesa_rrpp']
        });


        data['FICHA_Precio'] = {};

        const fields1 = [
            'tipo_entradas', 'precio_anticipada', 'precio_taquilla', 'descuentos', 'lista_puerta',
            'lista_puerta_cond', 'precio_agua', 'precio_refresco', 'precio_cerveza', 'precio_combinado',
            'precio_combinado_prem', 'precio_chupito', 'precio_botella', 'precio_mesa',
            'precio_guardarropia', 'precio_marchandising', 'precio_otros', 'observ_precios',
            'turistas_porc', 'turistic_pers_idiomas', 'turistic_pers_idiomas_cual_ingles',
            'turistic_pers_idiomas_cual_frances', 'turistic_pers_idiomas_cual_otro', 'señal_idiomas',
            'señal_idiomas_cual_ingles', 'señal_idiomas_cual_frances', 'señal_idiomas_cual_otro',
            'pers_att_grupos', 'pers_att_grupos_cual', 'venta_online_idiomas',
            'venta_online_idiomas_cual_ingles', 'venta_online_idiomas_cual_frances',
            'venta_online_idiomas_cual_otro', 'Obsrv_att_turist'
        ];

        for (const field of fields1) {
            data['FICHA_Precio'][field] = await PrecioModel.findAll({
                attributes: [
                    field,
                    [sequelize.fn('COUNT', sequelize.col(field)), 'count']
                ],
                group: [field]
            });
        }

        // Custom fields with specific logic
        const customFields = {
            'turistic_pers_idiomas': ['turistic_pers_idiomas_cual_ingles', 'turistic_pers_idiomas_cual_frances', 'turistic_pers_idiomas_cual_otro'],
            'señal_idiomas': ['señal_idiomas_cual_ingles', 'señal_idiomas_cual_frances', 'señal_idiomas_cual_otro'],
            'venta_online_idiomas': ['venta_online_idiomas_cual_ingles', 'venta_online_idiomas_cual_frances', 'venta_online_idiomas_cual_otro']
        };

        for (const [mainField, subFields] of Object.entries(customFields)) {
            const attributes = subFields.map(subField => [
                sequelize.fn('COUNT', sequelize.literal(`CASE WHEN ${subField}=1 THEN 1 END`)), subField
            ]);
            data['FICHA_Precio'][mainField] = await PrecioModel.findAll({ attributes });
        }

        data['FICHA_BuenasPracticas'] = {};

        const field2 = [
            'info_online', 'mediacion_sala', 'ruido', 'seg_vial', 'Punto_viol',
            'respon_bebidas', 'reciclaje', 'sello_calidad', 'observ_buenas'
        ];

        for (const field of field2) {
            data['FICHA_BuenasPracticas'][field] = await BuenaPracticaModel.findAll({
                attributes: [
                    field,
                    [sequelize.fn('COUNT', sequelize.col(field)), 'count']
                ],
                group: [field]
            });
        }


        data['FICHA_MalasPracticas'] = {};

        const field4 = [
            'mala_consum', 'dobles_puertas', 'acti_personal', 'incumpl_aforo', 'incumpl_norma',
            'Molestias_local', 'consum_abus', 'consum_drogas', 'observ_malas', 'inc_acceso',
            'inc_acceso_desc', 'expuls_arbitrarias', 'expuls_arbitrarias_desc', 'altercados',
            'altercados_desc', 'observ_incid'
        ];

        for (const field of field4) {
            if (field.includes('desc') || field.includes('observ')) {
                data['FICHA_MalasPracticas'][field] = await MalaPracticaModel.findAll({
                    attributes: [
                        field,
                        [sequelize.fn('COUNT', sequelize.col(field)), 'count']
                    ],
                    group: [field]
                });
            } else {
                data['FICHA_MalasPracticas'][field] = await MalaPracticaModel.findAll({
                    attributes: [
                        [sequelize.fn('COUNT', sequelize.literal(`CASE WHEN ${field}=1 THEN 1 END`)), field]
                    ]
                });
            }
        }

        data['FICHA_Valoracion'] = {};

        const field3 = [
            'val_local', 'val_personal', 'val_ambiente', 'val_interes', 'observ_val', 'archivo'
        ];

        for (const field of field3) {
            data['FICHA_Valoracion'][field] = await ValoracionModel.findAll({
                attributes: [
                    field,
                    [sequelize.fn('COUNT', sequelize.col(field)), 'count']
                ],
                group: [field]
            });
        }


        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
