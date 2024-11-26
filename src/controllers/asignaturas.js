const asignaturaModelo = require('../models/asignaturas'); // Importamos el modelo de "Imparte"

// Asignar un profesor a una asignatura
const asignarProfesorAsignatura = async (req, res) => {
    const { cod_a, id_p } = req.params; 
    const { grupo, horario } = req.body;

    try {
        const asignacion = await asignaturaModelo.asignarProfeorAsignatura(grupo, id_p, cod_a, horario);
        res.status(201).json(asignacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al asignar el profesor a la asignatura' });
    }
};
// Obtener todas las asignaturas
const obtenerAsignaturas = async (req, res) => {
    try {
        const asignaturas = await asignaturaModelo.obtenerAsignaturas();
        res.json(asignaturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaturas' });
    }
};

// Obtener una asignatura por ID
const obtenerAsignaturaPorId = async (req, res) => {
    const { cod_a } = req.params;
    try {
        const asignatura = await asignaturaModelo.obtenerAsignaturaPorId(cod_a);
        if (!asignatura) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        res.json(asignatura);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la asignatura' });
    }
};

// Crear una nueva asignatura
const crearAsignatura = async (req, res) => {
    const nuevaAsignatura = req.body;
    try {
        const asignatura = await asignaturaModelo.crearAsignatura(nuevaAsignatura);
        res.status(201).json(asignatura);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignatura' });
    }
};

// Actualizar una asignatura
const actualizarAsignatura = async (req, res) => {
    const { cod_a } = req.params;
    const datosActualizados = req.body;
    try {
        const asignatura = await asignaturaModelo.actualizarAsignatura(cod_a, datosActualizados);
        if (!asignatura) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        res.json(asignatura);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la asignatura' });
    }
};

// Eliminar una asignatura

const eliminarAsignatura = async (req, res) => {
    const { cod_a } = req.params;
    try {
        const asignatura = await asignaturaModelo.eliminarAsignatura(cod_a);
        if (!asignatura) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        res.json(asignatura);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la asignatura' });
    }
};

const obtenerAsignaturasPorEstudiante = async (req, res) => {
    const { cod_e } = req.params;
    try {
        const asignaturas = await asignaturaModelo.obtenerAsignaturasPorEstudiante(cod_e);

        if (!asignaturas || asignaturas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron asignaturas para este estudiante' });
        }

        res.json(asignaturas); // Devuelve la lista de asignaturas
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaturas' });
    }
};

const obtenerEstudiantePorAsignatura = async (req, res) => {
    const { cod_a } = req.params; 
    try {
        const asignaturas = await asignaturaModelo.obtenerEstudiantePorAsignatura(cod_a);

        if (!asignaturas || asignaturas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron asignaturas para este estudiante' });
        }

        res.json(asignaturas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaturas' });
    }
};


const profesoresImpartenAsignatura = async (req, res) => {
    const { cod_a } = req.params;
    try {
        const imparte = await asignaturaModelo.profesoresImpartenAsignatura(cod_a);
        if (!imparte) {
            return res.status(404).json({ error: 'Asignatura no encontrada' });
        }
        res.json(imparte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la asignación' });
    }
};

module.exports = {
    obtenerAsignaturas,
    obtenerAsignaturaPorId,
    crearAsignatura,
    actualizarAsignatura,
    eliminarAsignatura,
    obtenerAsignaturasPorEstudiante,
    obtenerEstudiantePorAsignatura,
    profesoresImpartenAsignatura,
    asignarProfesorAsignatura
};
