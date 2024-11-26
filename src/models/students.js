const db = require('../config/db');

// Obtener todos los estudiantes
const getAllStudents = async () => {
    const result = await db.query('SELECT * FROM Estudiantes');
    return result.rows;
};

// Obtener un estudiante por ID
const getStudentById = async (cod_e) => {
    const result = await db.query('SELECT * FROM Estudiantes WHERE cod_e = $1', [cod_e]);
    return result.rows[0];
};

// Crear un nuevo estudiante
const createStudent = async (studentData) => {
    const { cod_e, nom_e, dir_e, tel_e, fech_nac } = studentData;
    const result = await db.query(
        'INSERT INTO Estudiantes (cod_e, nom_e, dir_e, tel_e, fech_nac) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [cod_e, nom_e, dir_e, tel_e, fech_nac]
    );
    return result.rows[0];
};

// Actualizar un estudiante
const updateStudent = async (cod_e, studentData) => {
    const { nom_e, dir_e, tel_e, fech_nac } = studentData;
    const result = await db.query(
        'UPDATE Estudiantes SET nom_e = $1, dir_e = $2, tel_e = $3, fech_nac = $4 WHERE cod_e = $5 RETURNING *',
        [nom_e, dir_e, tel_e, fech_nac, cod_e]
    );
    return result.rows[0];
};

// Eliminar un estudiante
const deleteStudent = async (cod_e) => {
    const result = await db.query('DELETE FROM Estudiantes WHERE cod_e = $1 RETURNING *', [cod_e]);
    return result.rows[0];
};

// Obtener asignaturas por estudiante
const getSubjectsByStudent = async (cod_e) => {
    const query = `
        SELECT A.cod_a, A.nom_a, I.n1, I.n2, I.n3
        FROM Asignaturas A
        JOIN Inscribe I ON A.cod_a = I.cod_a
        WHERE I.cod_e = $1`;
    const { rows } = await db.query(query, [cod_e]);
    return rows;
};
// Obtener asignaturas por estudiante y sus notas
const obtenerAsignaturasPorEstudiante = async (cod_e) => {
    const query = `
        SELECT A.cod_a, A.nom_a, I.n1, I.n2, I.n3
        FROM Asignaturas A
        JOIN Inscribe I ON A.cod_a = I.cod_a
        WHERE I.cod_e = $1`;
    const { rows } = await db.query(query, [cod_e]);
    return rows;
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, getSubjectsByStudent,obtenerAsignaturasPorEstudiante };
