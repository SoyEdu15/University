const express = require('express');
const profesorControlador= require('../controllers/professors');
const router = express.Router();


// Obtener todos los profesors
router.get('/', profesorControlador.getProfessors);
// Obtener un profesor
router.get('/:id_p', profesorControlador.getProfessor);
// Crear un profesor
router.post('/', profesorControlador.registerProfessor);
// Editar un profesor
router.put('/:id_p', profesorControlador.updateProfessorData);
// Eliminar un profesor
router.delete('/:id_p', profesorControlador.deleteProfessorData);


// obtener asignaturas de un profesor
router.get('/:id_p/asignaturas', profesorControlador.asignaturasImpartidasPorProfesor);
module.exports = router;
