const db = require('../config/db');


const getAllProfessors = async () => {
    const result = await db.query('SELECT * FROM Profesores');
    return result.rows;
};

const getProfessorById = async (id_p) => {
    const result = await db.query('SELECT * FROM Profesores WHERE id_p = $1', [id_p]);
    return result.rows[0];
};


const createProfessor = async (professor) => {
    const { id_p, nom_p, dir_p, tel_p, profesion } = professor;
    const result = await db.query(
        'INSERT INTO Profesores (id_p, nom_p, dir_p, tel_p, profesion) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id_p, nom_p, dir_p, tel_p, profesion]
    );
    return result.rows[0];
};

//  actualizar professor
const updateProfessor = async (id_p, professor) => {
    const { nom_p, dir_p, tel_p, profesion } = professor;
    const result = await db.query(
        'UPDATE Profesores SET nom_p = $1, dir_p = $2, tel_p = $3, profesion = $4 WHERE id_p = $5 RETURNING *',
        [nom_p, dir_p, tel_p, profesion, id_p]
    );
    return result.rows[0];
};

// Modelo para eliminar un profesor
const deleteProfessor = async (id_p) => {
    const result = await db.query('DELETE FROM Profesores WHERE id_p = $1 RETURNING *', [id_p]);
    return result.rows[0];
};


const asignaturasImpartidasPorProfesor = async (id_p) => {
    const query = 'SELECT * FROM Imparte WHERE id_p = $1';
    const { rows } = await db.query(query, [id_p]);
    return rows[0];
};
module.exports = {
    getAllProfessors,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor,
    asignaturasImpartidasPorProfesor,
    
};
