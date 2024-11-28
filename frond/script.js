const baseUrl = "http://localhost:3000/api/estudiantes";

// Función para obtener todos los estudiantes
async function getAllStudents() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();

        // Ordenar los estudiantes por ID de menor a mayor
        data.sort((a, b) => a.cod_e - b.cod_e);

        const studentList = document.getElementById("student-list");
        studentList.innerHTML = ''; // Limpiar contenido anterior

        // Agregar los estudiantes ordenados a la tabla
        data.forEach(student => {
            // Formatear la fecha de nacimiento
            const formattedDate = new Date(student.fech_nac).toISOString().split('T')[0]; // Extraer solo la parte de la fecha (YYYY-MM-DD)

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.cod_e}</td>
                <td>${student.nom_e}</td>
                <td>${student.dir_e}</td>
                <td>${student.tel_e}</td>
                <td>${formattedDate}</td> <!-- Fecha formateada -->
                <td>
                    <button class="edit-button" onclick="showEditForm(${student.cod_e})">Editar</button>
                    <button class="delete-button" onclick="deleteStudent(${student.cod_e})">Eliminar</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar los estudiantes:", error);
    }
}

// Función para buscar estudiante por ID
async function searchById() {
    const searchId = document.getElementById("search-id").value;
    try {
        const response = await fetch(`${baseUrl}/${searchId}`);
        const student = await response.json();

        const studentList = document.getElementById("student-list");
        studentList.innerHTML = ''; // Limpiar contenido anterior

        if (student.cod_e) {
            // Formatear la fecha de nacimiento
            const formattedDate = new Date(student.fech_nac).toISOString().split('T')[0];

            // Mostrar el estudiante encontrado
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.cod_e}</td>
                <td>${student.nom_e}</td>
                <td>${student.dir_e}</td>
                <td>${student.tel_e}</td>
                <td>${formattedDate}</td> <!-- Fecha formateada -->
                <td>
                    <button class="edit-button" onclick="showEditForm(${student.cod_e})">Editar</button>
                    <button class="delete-button" onclick="deleteStudent(${student.cod_e})">Eliminar</button>
                </td>
            `;
            studentList.appendChild(row);
        } else {
            alert("Estudiante no encontrado");
        }
    } catch (error) {
        console.error("Error al buscar el estudiante:", error);
    }
}

// Función para mostrar el formulario de añadir estudiante
function showAddForm() {
    document.getElementById("add-section").style.display = "block";
    document.getElementById("edit-form").style.display = "none";
}

// Función para añadir un nuevo estudiante
async function addStudent(event) {
    event.preventDefault();

    const id = document.getElementById("add-id").value;
    const name = document.getElementById("add-name").value;
    const address = document.getElementById("add-address").value;
    const phone = document.getElementById("add-phone").value;
    const birthDate = document.getElementById("add-birthdate").value; // Obtener fecha de nacimiento

    const newStudent = {
        cod_e: id,
        nom_e: name,
        dir_e: address,
        tel_e: phone,
        fech_nac: birthDate // Enviar fecha de nacimiento
    };

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        });

        if (response.ok) {
            alert("Estudiante añadido correctamente");
            getAllStudents(); // Recargar la lista de estudiantes
            backToList(); // Volver a la lista
        } else {
            alert("Error al añadir el estudiante");
        }
    } catch (error) {
        console.error("Error al añadir el estudiante:", error);
    }
}

// Función para volver a la lista de estudiantes
function backToList() {
    document.getElementById("add-section").style.display = "none";
    document.getElementById("edit-form").style.display = "none";
}

// Función para mostrar el formulario de edición
async function showEditForm(id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const student = await response.json();

        if (student.cod_e) {
            // Mostrar formulario de edición con los datos del estudiante
            document.getElementById("edit-id").value = student.cod_e;
            document.getElementById("edit-name").value = student.nom_e;
            document.getElementById("edit-address").value = student.dir_e;
            document.getElementById("edit-phone").value = student.tel_e;
            document.getElementById("edit-birthdate").value = student.fech_nac.split('T')[0]; // Establecer fecha en el formulario

            // Mostrar el formulario de edición y ocultar la lista
            document.getElementById("edit-form").style.display = "block";
            document.getElementById("add-section").style.display = "none";
            window.scrollTo(0, document.body.scrollHeight); // Desplazarse hasta la sección de edición
        }
    } catch (error) {
        console.error("Error al obtener el estudiante:", error);
    }
}

// Función para guardar los cambios en un estudiante
async function saveChanges(event) {
    event.preventDefault();

    const id = document.getElementById("edit-id").value;
    const name = document.getElementById("edit-name").value;
    const address = document.getElementById("edit-address").value;
    const phone = document.getElementById("edit-phone").value;
    const birthDate = document.getElementById("edit-birthdate").value; // Obtener fecha de nacimiento

    const updatedStudent = {
        cod_e: id,
        nom_e: name,
        dir_e: address,
        tel_e: phone,
        fech_nac: birthDate // Enviar fecha de nacimiento
    };

    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStudent)
        });

        if (response.ok) {
            alert("Estudiante actualizado correctamente");
            getAllStudents(); // Recargar la lista de estudiantes
            backToList(); // Volver a la lista
        } else {
            alert("Error al actualizar el estudiante");
        }
    } catch (error) {
        console.error("Error al actualizar el estudiante:", error);
    }
}

// Función para eliminar un estudiante
async function deleteStudent(id) {
    if (confirm("¿Estás seguro de que quieres eliminar a este estudiante?")) {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Estudiante eliminado correctamente");
                getAllStudents(); // Recargar la lista de estudiantes
            } else {
                alert("Error al eliminar el estudiante");
            }
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
        }
    }
}

// Cargar todos los estudiantes al cargar la página
getAllStudents();
