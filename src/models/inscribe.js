const db = require('../config/db');

// Obtener todas las inscripciones
const obtenerInscripciones = async () => {
    const query = 'SELECT * FROM Inscribe';
    const { rows } = await db.query(query);
    return rows;
};

// Obtener una inscripción específica
const obtenerInscripcionPorId = async (cod_e, grupo, cod_a, id_p) => {
    const query = `SELECT * FROM Inscribe 
                    WHERE cod_e = $1 AND grupo = $2 AND cod_a = $3 AND id_p = $4`;
    const { rows } = await db.query(query, [cod_e, grupo, cod_a, id_p]);
    return rows[0];
};

// Crear una nueva inscripción
const crearInscripcion = async (inscripcion) => {
    const query = `INSERT INTO Inscribe (cod_e, grupo, cod_a, id_p, n1, n2, n3) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const valores = [
        inscripcion.cod_e,
        inscripcion.grupo,
        inscripcion.cod_a,
        inscripcion.id_p,
        inscripcion.n1 || 0,
        inscripcion.n2 || 0,
        inscripcion.n3 || 0,
    ];
    const { rows } = await db.query(query, valores);
    return rows[0];
};

// Actualizar una inscripción
const actualizarInscripcion = async (cod_e, grupo, cod_a, id_p, inscripcion) => {
    const query = `UPDATE Inscribe 
                   SET n1 = $1, n2 = $2, n3 = $3 
                   WHERE cod_e = $4 AND grupo = $5 AND cod_a = $6 AND id_p = $7 
                   RETURNING *`;
    const valores = [
        inscripcion.n1,
        inscripcion.n2,
        inscripcion.n3,
        cod_e,
        grupo,
        cod_a,
        id_p,
    ];
    const { rows } = await db.query(query, valores);
    return rows[0];
};

// Eliminar una inscripción
const eliminarInscripcion = async (cod_e, grupo, cod_a, id_p) => {
    const query = `DELETE FROM Inscribe 
                    WHERE cod_e = $1 AND grupo = $2 AND cod_a = $3 AND id_p = $4 
                    RETURNING *`;
    const { rows } = await db.query(query, [cod_e, grupo, cod_a, id_p]);
    return rows[0];
};

module.exports = {
    obtenerInscripciones,
    obtenerInscripcionPorId,
    crearInscripcion,
    actualizarInscripcion,
    eliminarInscripcion,
};
