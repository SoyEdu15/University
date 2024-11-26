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
        await pool.query('DELETE FROM Imparte WHERE id_p = $1', [id_p]);

        const result = await pool.query('DELETE FROM Profesores WHERE id_p = $1 RETURNING *', [id_p]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }

        res.status(200).json({ message: 'Profesor eliminado correctamente', professor: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Error al eliminar el profesor' });
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
