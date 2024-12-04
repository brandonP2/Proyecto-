document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:5001/api/initiatives"; // URL del backend
    const token = localStorage.getItem("token"); // Token JWT almacenado en localStorage

    const initiativesTable = document.getElementById("initiatives-table").querySelector("tbody");
    const form = document.getElementById("initiative-form");
    const addButton = document.getElementById("add-initiative-button");
    const cancelButton = document.getElementById("cancel-button");
    const formTitle = document.getElementById("form-title");

    // Cargar todas las iniciativas desde el backend
    const loadInitiatives = async () => {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    "Authorization": `Bearer ${token}` // Incluye el token en el encabezado
                }
            });

            if (!response.ok) throw new Error("Error al cargar iniciativas");
            const data = await response.json();

            initiativesTable.innerHTML = ""; // Limpiar tabla
            data.forEach(initiative => {
                initiativesTable.innerHTML += `
                    <tr>
                        <td>${initiative._id}</td>
                        <td>${initiative.title}</td>
                        <td>${initiative.description}</td>
                        <td>${initiative.category}</td>
                        <td>${initiative.startDate.slice(0, 10)}</td>
                        <td>
                            <button class="btn-primary" onclick="editInitiative('${initiative._id}')">Editar</button>
                            <button class="btn-danger" onclick="deleteInitiative('${initiative._id}')">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    // Guardar una nueva iniciativa o actualizar una existente
    const saveInitiative = async (e) => {
        e.preventDefault();
        const id = document.getElementById("initiative-id").value;
        const initiative = {
            title: document.getElementById("initiative-title").value,
            description: document.getElementById("initiative-description").value,
            category: document.getElementById("initiative-category").value,
            startDate: document.getElementById("initiative-start-date").value
        };

        const method = id ? "PUT" : "POST";
        const url = id ? `${apiUrl}/${id}` : apiUrl;

        console.log("URL:", url);
        console.log("Método:", method);
        console.log("Token:", token);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Incluye el token en el encabezado
                },
                body: JSON.stringify(initiative)
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error al guardar la iniciativa: ${errorData.message}`);
            }
        
            form.reset();
            form.style.display = "none";
            loadInitiatives();
        } catch (error) {
            console.error("Error al guardar la iniciativa:", error.message);
            alert(error.message);
        }
        
    };

    // Editar una iniciativa
    window.editInitiative = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}` // Incluye el token en el encabezado
                }
            });

            if (!response.ok) throw new Error("Error al obtener los datos de la iniciativa");
            const initiative = await response.json();

            document.getElementById("initiative-id").value = initiative._id;
            document.getElementById("initiative-title").value = initiative.title;
            document.getElementById("initiative-description").value = initiative.description;
            document.getElementById("initiative-category").value = initiative.category;
            document.getElementById("initiative-start-date").value = initiative.startDate.slice(0, 10);

            formTitle.textContent = "Editar Iniciativa";
            form.style.display = "block";
        } catch (error) {
            console.error(error.message);
        }
    };

    // Eliminar una iniciativa
    window.deleteInitiative = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}` // Incluye el token en el encabezado
                }
            });

            if (!response.ok) throw new Error("Error al eliminar la iniciativa");

            loadInitiatives();
        } catch (error) {
            console.error(error.message);
        }
    };

    // Listeners
    addButton.addEventListener("click", () => {
        form.reset();
        formTitle.textContent = "Añadir Nueva Iniciativa";
        form.style.display = "block";
    });

    cancelButton.addEventListener("click", () => {
        form.style.display = "none";
    });

    form.addEventListener("submit", saveInitiative);

    // Carga inicial
    loadInitiatives();
});
