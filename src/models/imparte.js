const db = require('../config/db');

// Obtener todas las asignaciones de "Imparte"
const obtenerImparte = async () => {
    const query = 'SELECT * FROM Imparte';
    const { rows } = await db.query(query);
    return rows;
};

// Obtener una asignación específica por grupo, id_p y cod_a
const obtenerImpartePorId = async (grupo, id_p, cod_a) => {
    const query = 'SELECT * FROM Imparte WHERE grupo = $1 AND id_p = $2 AND cod_a = $3';
    const { rows } = await db.query(query, [grupo, id_p, cod_a]);
    return rows[0];
};


// Crear una nueva asignación en "Imparte"
const crearImparte = async (imparte) => {
    const query = `
        INSERT INTO Imparte (grupo, id_p, cod_a, horario)
        VALUES ($1, $2, $3, $4) RETURNING *`;
    const valores = [imparte.grupo, imparte.id_p, imparte.cod_a, imparte.horario];
    const { rows } = await db.query(query, valores);
    return rows[0];
};

// Actualizar una asignación en "Imparte"
const actualizarImparte = async (grupo, id_p, cod_a, datosActualizados) => {
    const query = `
        UPDATE Imparte
        SET horario = $1
        WHERE grupo = $2 AND id_p = $3 AND cod_a = $4 RETURNING *`;
    const valores = [datosActualizados.horario, grupo, id_p, cod_a];
    const { rows } = await db.query(query, valores);
    return rows[0];
};

// Eliminar una asignación en "Imparte"
const eliminarImparte = async (grupo, id_p, cod_a) => {
    const query = `
        DELETE FROM Imparte 
        WHERE grupo = $1 AND id_p = $2 AND cod_a = $3 RETURNING *`;
    const { rows } = await db.query(query, [grupo, id_p, cod_a]);
    return rows[0];
};

module.exports = {
    obtenerImparte,
    obtenerImpartePorId,
    crearImparte,
    actualizarImparte,
    eliminarImparte,
};
