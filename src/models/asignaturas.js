const db = require('../config/db');

// Obtener todas las asignaturas
const obtenerAsignaturas = async () => {
    const query = 'SELECT * FROM Asignaturas';
    const { rows } = await db.query(query);
    return rows;
};

// Obtener una asignatura por ID
const obtenerAsignaturaPorId = async (cod_a) => {
    const query = 'SELECT * FROM Asignaturas WHERE cod_a = $1';
    const { rows } = await db.query(query, [cod_a]);
    return rows[0];
};

// Crear una asignatura
const crearAsignatura = async (asignatura) => {
    const query = `INSERT INTO Asignaturas (cod_a, nom_a, int_h, creditos_a) 
                   VALUES ($1, $2, $3, $4) RETURNING *`;
    const valores = [asignatura.cod_a, asignatura.nom_a, asignatura.int_h, asignatura.creditos_a];
    const { rows } = await db.query(query, valores);
    return rows[0];
};

// Actualizar una asignatura
const actualizarAsignatura = async (cod_a, asignatura) => {
    const query = `UPDATE Asignaturas 
                    SET nom_a = $1, int_h = $2, creditos_a = $3 
                    WHERE cod_a = $4 RETURNING *`;
    const valores = [asignatura.nom_a, asignatura.int_h, asignatura.creditos_a, cod_a];
    const { rows } = await db.query(query, valores);
    return rows[0];
};

// Eliminar una asignatura
const eliminarAsignatura = async (cod_a) => {
    const query = 'DELETE FROM Asignaturas WHERE cod_a = $1 RETURNING *';
    const { rows } = await db.query(query, [cod_a]);
    return rows[0];
};
const obtenerAsignaturasPorEstudiante = async (cod_e) => {

    const query = `SELECT * FROM inscribe WHERE cod_e = $1`;
    const resultado = await db.query(query, [cod_e]); 
    return resultado.rows; // Devuelve las asignaturas
};
const obtenerEstudiantePorAsignatura = async (cod_a) => {
    const query = `SELECT * FROM inscribe WHERE cod_a = $1`;
    const resultado = await db.query(query, [cod_a]);
    return resultado.rows;
};

const profesoresImpartenAsignatura = async (cod_a) => {
    const query = 'SELECT * FROM Imparte WHERE cod_a = $1';
    const { rows } = await db.query(query, [cod_a]);
    return rows[0];
};

const asignarProfeorAsignatura = async (grupo, id_p, cod_a, horario) => {
    const query = `INSERT INTO Imparte (grupo, id_p, cod_a, horario) 
                   VALUES ($1, $2, $3, $4) RETURNING *`;
    const valores = [grupo, id_p, cod_a, horario];
    try {
        const { rows } = await db.query(query, valores);
        return rows[0];  
    } catch (error) {
        console.error('Error al asignar el profesor:', error);
        throw error;  
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
    asignarProfeorAsignatura
};
