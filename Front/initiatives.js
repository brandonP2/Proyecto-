document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://localhost:5001/api/initiatives"; // URL del backend
    const token = localStorage.getItem("token"); // Token JWT almacenado en localStorage

    const initiativesTable = document.getElementById("initiatives-table").querySelector("tbody");
    const form = document.getElementById("initiative-form");
    const addButton = document.getElementById("add-initiative-button");
    const cancelButton = document.getElementById("cancel-button");
    const formTitle = document.getElementById("form-title");

    const loadInitiatives = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(apiUrl, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
    
            if (!response.ok) throw new Error("Error al cargar iniciativas");
            const data = await response.json();
    
            initiativesTable.innerHTML = "";
            data.forEach(initiative => {
                initiativesTable.innerHTML += `
                    <tr>
                        <td>${initiative.title}</td>
                        <td>${initiative.description}</td>
                        <td>${initiative.category}</td>
                        <td>${initiative.startDate.slice(0, 10)}</td>
                        <td class="action-buttons">
                            <button class="icon-button edit-button" onclick="editInitiative('${initiative._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/>
                                </svg>
                            </button>
                            <button class="icon-button delete-button" onclick="deleteInitiative('${initiative._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                </svg>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const saveInitiative = async (e) => {
            e.preventDefault();
            const token = localStorage.getItem("token"); // Obtener el token
        
            const initiative = {
                title: document.getElementById("initiative-title").value,
                description: document.getElementById("initiative-description").value,
                category: document.getElementById("initiative-category").value,
                startDate: document.getElementById("initiative-start-date").value
            };
        
            const method = document.getElementById("initiative-id").value ? "PUT" : "POST";
            const url = document.getElementById("initiative-id").value 
                ? `${apiUrl}/${document.getElementById("initiative-id").value}` 
                : apiUrl;
        
            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Incluir el token en el header
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
