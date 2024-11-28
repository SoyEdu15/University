const express = require('express');
const students = require('../controllers/students'); // Asegúrate de que el archivo ahora se llama 'students.js'

const router = express.Router();

// Obtener todos los estudiantes
router.get('/', students.getStudents);
// Obtener un estudiante
router.get('/:cod_e', students.getStudentById); 
// Crear un estudiante
router.post('/', students.createStudent);
// Editar un estudiante
router.put('/:cod_e', students.updateStudent);
// Eliminar un estudiante
router.delete('/:cod_e', students.deleteStudent);
// Obtener las asignaturas de un estudinate 
router.get('/:cod_e/asignaturas', students.obtenerAsignaturasPorEstudiante); 

module.exports = router;
