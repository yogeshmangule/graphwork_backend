import express from "express"
import cors from 'cors'
import db from "./database/db.js"
import blogRoutes from './routes/routes.js'
// import bodyParser from "body-parser"
// Ejemplo de importación
import userRoutes from './routes/userRoutes.js';
import encuestaRoutes from './routes/encuestaRoutes.js';
import horarioRoutes from './routes/horarioRoutes.js';
import ambienteRoutes from './routes/ambienteRoutes.js';
import instalacionRoutes from './routes/instalacionRoutes.js';
import seguridadRoutes from './routes/seguridadRoutes.js';
import entornoRoutes from './routes/entornoRoutes.js';
import servicioRoutes from './routes/servicioRoutes.js';
import espectaculoRoutes from './routes/espectaculoRoutes.js';
import personalRoutes from './routes/personalRoutes.js';
import marketingRoutes from './routes/marketingRoutes.js';
import precioRoutes from './routes/precioRoutes.js';
import buenaPractRoutes from './routes/buenasPracticasRoutes.js';
import malaPractRoutes from './routes/malaPracticaRoutes.js';
import valoracionRoutes from './routes/valoracionRoutes.js';
import surveyListRoute from './routes/surveyListRoute.js';
import establishmentsRoutes from './routes/establishmentsRoutes.js';
const app = express()

app.use(cors())
// Configura el límite de carga de cuerpo (body) a 5 MB
app.use(express.json({ limit: '10mb' }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use(express.json())
app.use('/blogs', blogRoutes)
app.use('/usuarios', userRoutes);
app.use('/encuesta', encuestaRoutes);
app.use('/horario', horarioRoutes);
app.use('/ambiente', ambienteRoutes);
app.use('/instalacion', instalacionRoutes);
app.use('/seguridad', seguridadRoutes);
app.use('/entorno', entornoRoutes);
app.use('/servicio', servicioRoutes);
app.use('/espectaculo', espectaculoRoutes);
app.use('/personal', personalRoutes);
app.use('/marketing', marketingRoutes);
app.use('/precio', precioRoutes);
app.use('/rscbuena', buenaPractRoutes);
app.use('/rscmala', malaPractRoutes);
app.use('/valoracion', valoracionRoutes);
app.use('/survey-list', surveyListRoute);
app.use('/establishments', establishmentsRoutes);



try {
    await db.authenticate()
    console.log('Conexion Exitosa a la BD')
} catch (error) {
    console.log(`El error de conexion es: ${error}`)
}

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.listen(8000, () => {
    console.log('SERVER UP running in http://localhost:8000/')
})