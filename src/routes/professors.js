const express = require('express');
const profesorControlador= require('../controllers/professors');
const router = express.Router();


router.get('/', profesorControlador.getProfessors);
router.get('/:id_p', profesorControlador.getProfessor);
router.post('/', profesorControlador.registerProfessor);
router.put('/:id_p', profesorControlador.updateProfessorData);
router.delete('/:id_p', profesorControlador.deleteProfessorData);


router.get('/:id_p/asignaturas', profesorControlador.asignaturasImpartidasPorProfesor);
module.exports = router;
