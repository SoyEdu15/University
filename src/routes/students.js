const express = require('express');
const students = require('../controllers/students'); // Asegúrate de que el archivo ahora se llama 'students.js'

const router = express.Router();

router.get('/', students.getStudents);
router.get('/:cod_e', students.getStudentById); 
router.post('/', students.createStudent);
router.put('/:cod_e', students.updateStudent);
router.delete('/:cod_e', students.deleteStudent);
router.get('/:cod_e/asignaturas', students.obtenerAsignaturasPorEstudiante); 

module.exports = router;
