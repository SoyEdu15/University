const profesorModelo = require('../models/professors');

// Obtener todos los profesores
const getProfessors = async (req, res) => {
    try {
        const professors = await profesorModelo.getAllProfessors();
        res.status(200).json(professors);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los profesores' });
    }
};
const getProfessor = async (req, res) => {
    const { id_p } = req.params;
    try {
        const professor = await profesorModelo.getProfessorById(id_p);
        if (!professor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        res.status(200).json(professor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el profesor' });
    }
};

// Nuevo profesor
const registerProfessor = async (req, res) => {
    const { id_p, nom_p, dir_p, tel_p, profesion } = req.body;
    try {
        const professor = await profesorModelo.createProfessor({ id_p, nom_p, dir_p, tel_p, profesion });
        res.status(201).json(professor);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el profesor' });
    }
};

// Actualizar un profesor
const updateProfessorData = async (req, res) => {
    const { id_p } = req.params;
    const { nom_p, dir_p, tel_p, profesion } = req.body;
    try {
        const updatedProfessor = await profesorModelo.updateProfessor(id_p, { nom_p, dir_p, tel_p, profesion });
        if (!updatedProfessor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        res.status(200).json(updatedProfessor);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el profesor' });
    }
};

// Eliminar un profesor
const deleteProfessorData = async (req, res) => {
    const { id_p } = req.params;

    try {
        // Llama a la función para eliminar el profesor
        const deletedProfessor = await profesorModelo.deleteProfessor(id_p);

        // Verifica si se encontró y eliminó el profesor
        if (!deletedProfessor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        // Respuesta exitosa
        return res.status(200).json({
            message: 'Profesor eliminado exitosamente',
            data: deletedProfessor
        });

    } catch (error) {
        // Manejo de errores
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
};

const asignaturasImpartidasPorProfesor = async (req, res) => {
    const { id_p } = req.params;
    try {
        const imparte = await profesorModelo.asignaturasImpartidasPorProfesor(id_p);
        if (!imparte) {
            return res.status(404).json({ error: 'Profesor no tinee asignaturas o no existe' });
        }
        res.json(imparte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la asignación' });
    }
};



module.exports = { getProfessors, getProfessor, registerProfessor, updateProfessorData, deleteProfessorData,
    asignaturasImpartidasPorProfesor
};
