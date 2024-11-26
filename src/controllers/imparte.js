const imparteModelo = require('../models/imparte');

// Obtener todas las asignaciones
const obtenerImparte = async (req, res) => {
    try {
        const imparte = await imparteModelo.obtenerImparte();
        res.json(imparte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las asignaciones' });
    }
};

// Obtener una asignación por ID
const obtenerImpartePorId = async (req, res) => {
    const { grupo, id_p, cod_a } = req.params;
    try {
        const imparte = await imparteModelo.obtenerImpartePorId(grupo, id_p, cod_a);
        if (!imparte) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        res.json(imparte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la asignación' });
    }
};

// Crear una nueva asignación
const crearImparte = async (req, res) => {
    const nuevaImparte = req.body;
    try {
        const imparte = await imparteModelo.crearImparte(nuevaImparte);
        res.status(201).json(imparte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la asignación' });
    }
};

// Actualizar una asignación
const actualizarImparte = async (req, res) => {
    const { grupo, id_p, cod_a } = req.params;
    const datosActualizados = req.body;
    try {
        const imparte = await imparteModelo.actualizarImparte(grupo, id_p, cod_a, datosActualizados);
        if (!imparte) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        res.json(imparte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la asignación' });
    }
};

// Eliminar una asignación
const eliminarImparte = async (req, res) => {
    const { grupo, id_p, cod_a } = req.params;
    try {
        const imparte = await imparteModelo.eliminarImparte(grupo, id_p, cod_a);
        if (!imparte) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }
        res.json(imparte);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la asignación' });
    }
};

module.exports = {
    obtenerImparte,
    obtenerImpartePorId,
    crearImparte,
    actualizarImparte,
    eliminarImparte,
};
