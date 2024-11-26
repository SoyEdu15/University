const express = require('express');
const asignaturasControlador = require('../controllers/asignaturas');


const router = express.Router();
// — Crear una nueva asignatura
router.post('/', asignaturasControlador.crearAsignatura);
// — Listar todas las asignaturas.
router.get('/', asignaturasControlador.obtenerAsignaturas);
// — Consultar una asignatura.
router.get('/:cod_a', asignaturasControlador.obtenerAsignaturaPorId);
// — Lista de estudiantes inscritos en una asignatura con sus notas
router.get('/:cod_a/estudiantes', asignaturasControlador.obtenerEstudiantePorAsignatura);
// — Actualizar datos de una asignatura.
router.put('/:cod_a', asignaturasControlador.actualizarAsignatura);
// — Marcar como inactiva o eliminar una asignatura
router.delete('/:cod_a', asignaturasControlador.eliminarAsignatura);
// — Consultar profesores que imparten una asignatura específica.
router.get('/:cod_a/profesores', asignaturasControlador.profesoresImpartenAsignatura);
// — Asignar un profesor a una asignatura.
router.post('/:cod_a/profesor/:id_p', asignaturasControlador.asignarProfesorAsignatura);
module.exports = router;
