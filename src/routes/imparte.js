const express = require('express');
const router = express.Router();
const imparteController = require('../controllers/imparte');

// Rutas para "Imparte"

// Obtener todas las asignaciones
router.get('/', imparteController.obtenerImparte);

// Obtener una asignación por ID (requiere grupo, id_p, y cod_a)
router.get('/:grupo/:id_p/:cod_a', imparteController.obtenerImpartePorId);

// Crear una nueva asignación
router.post('/', imparteController.crearImparte);

// Actualizar una asignación existente
router.put('/:grupo/:id_p/:cod_a', imparteController.actualizarImparte);

// Eliminar una asignación
router.delete('/:grupo/:id_p/:cod_a', imparteController.eliminarImparte);

module.exports = router;
