const express = require('express');
const cors = require('cors');  // Importa el paquete cors
const professorsRoutes = require('./src/routes/professors');
const studentsRoutes = require('./src/routes/students');
const asignaturasRoutes = require('./src/routes/asignaturas');
const imparteRoutes = require('./src/routes/imparte');
const inscribeRoutes = require('./src/routes/inscribe');
require('./src/routes/consultas');
require('dotenv').config();

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());  // Esta línea habilita CORS para todas las rutas

app.use(express.json());

// Rutas
app.use('/api/profesores', professorsRoutes);
app.use('/api/estudiantes', studentsRoutes);
app.use('/api/asignaturas', asignaturasRoutes);
app.use('/api/imparte', imparteRoutes);
app.use('/api/inscribe', inscribeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}`);
});
