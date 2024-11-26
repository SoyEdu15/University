const express = require('express');
const router = express.Router();
const inscribeController = require('../controllers/inscribe');

// Rutas para "Inscribe"

// Obtener todas las inscripciones
router.get('/', inscribeController.obtenerInscripciones);

// Obtener una inscripción por ID
router.get('/:cod_e/:grupo/:cod_a/:id_p', inscribeController.obtenerInscripcionPorId);

// Crear una nueva inscripción
router.post('/', inscribeController.crearInscripcion);

// Actualizar una inscripción existente
router.put('/:cod_e/:grupo/:cod_a/:id_p', inscribeController.actualizarInscripcion);

// Eliminar una inscripción
router.delete('/:cod_e/:grupo/:cod_a/:id_p', inscribeController.eliminarInscripcion);

module.exports = router;
