const studentModel = require('../models/students');

// Obtener todos los estudiantes
const getStudents = async (req, res) => {
    try {
        const students = await studentModel.getAllStudents();
        res.status(200).json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
};

// Obtener un estudiante por ID
const getStudentById = async (req, res) => {
    const { cod_e } = req.params;
    try {
        const student = await studentModel.getStudentById(cod_e);
        if (!student) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al obtener el estudiante' });
    }
};

// Crear un nuevo estudiante
const createStudent = async (req, res) => {
    const { cod_e, nom_e, dir_e, tel_e, fech_nac } = req.body;
    if (!cod_e || !nom_e || !dir_e || !tel_e || !fech_nac) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
        const newStudent = await studentModel.createStudent(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al crear el estudiante' });
    }
};

// Actualizar un estudiante
const updateStudent = async (req, res) => {
    const { cod_e } = req.params;
    try {
        const updatedStudent = await studentModel.updateStudent(cod_e, req.body);
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al actualizar el estudiante' });
    }
};

// Eliminar un estudiante
const deleteStudent = async (req, res) => {
    const { cod_e } = req.params;
    try {
        const deletedStudent = await studentModel.deleteStudent(cod_e);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al eliminar el estudiante' });
    }
};

const obtenerAsignaturasPorEstudiante = async (req, res) => {
    const { cod_e } = req.params;
    try {
        const asignaturas = await studentModel.obtenerAsignaturasPorEstudiante(cod_e);
        if (asignaturas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron asignaturas para este estudiante' });
        }
        res.json(asignaturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaturas del estudiante' });
    }
};

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent,obtenerAsignaturasPorEstudiante};
