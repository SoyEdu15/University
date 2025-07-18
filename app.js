const express = require('express');
const morgan = require('morgan');
const cors = require('cors');  // Importa el paquete cors
const professorsRoutes = require('./src/routes/professors');
const studentsRoutes = require('./src/routes/students');
const asignaturasRoutes = require('./src/routes/asignaturas');
const imparteRoutes = require('./src/routes/imparte');
const inscribeRoutes = require('./src/routes/inscribe');
require('./src/routes/consultas');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());  

app.use(express.json());

// Rutas
app.use('/api/professors', professorsRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/coures', asignaturasRoutes);
app.use('/api/teaches', imparteRoutes);
app.use('/api/inscribe', inscribeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor andando en el puerto ${PORT}`);
});
