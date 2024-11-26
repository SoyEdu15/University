const inscribeModelo = require('../models/inscribe');

// Obtener todas las inscripciones
const obtenerInscripciones = async (req, res) => {
    try {
        const inscripciones = await inscribeModelo.obtenerInscripciones();
        res.json(inscripciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las inscripciones' });
    }
};

// Obtener una inscripción por ID
const obtenerInscripcionPorId = async (req, res) => {
    const { cod_e, grupo, cod_a, id_p } = req.params;
    try {
        const inscripcion = await inscribeModelo.obtenerInscripcionPorId(cod_e, grupo, cod_a, id_p);
        if (!inscripcion) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json(inscripcion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la inscripción' });
    }
};

// Crear una nueva inscripción
const crearInscripcion = async (req, res) => {
    const nuevaInscripcion = req.body;
    try {
        const inscripcion = await inscribeModelo.crearInscripcion(nuevaInscripcion);
        res.status(201).json(inscripcion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la inscripción' });
    }
};

// Actualizar una inscripción
const actualizarInscripcion = async (req, res) => {
    const { cod_e, grupo, cod_a, id_p } = req.params;
    const datosActualizados = req.body;
    try {
        const inscripcion = await inscribeModelo.actualizarInscripcion(cod_e, grupo, cod_a, id_p, datosActualizados);
        if (!inscripcion) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json(inscripcion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la inscripción' });
    }
};

// Eliminar una inscripción
const eliminarInscripcion = async (req, res) => {
    const { cod_e, grupo, cod_a, id_p } = req.params;
    try {
        const inscripcion = await inscribeModelo.eliminarInscripcion(cod_e, grupo, cod_a, id_p);
        if (!inscripcion) {
            return res.status(404).json({ error: 'Inscripción no encontrada' });
        }
        res.json(inscripcion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la inscripción' });
    }
};

module.exports = {
    obtenerInscripciones,
    obtenerInscripcionPorId,
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
};
