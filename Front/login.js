document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email-input").value;
        const password = document.getElementById("password-input").value;
        
        try {
            const response = await fetch("http://localhost:5001/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token)
                alert("Inicio de sesión exitoso.");
                window.location.href = "initiatives.html";
            } else {
                alert("Error al iniciar sesión. Verifica tus credenciales.");
            }
        } catch (error) {
            console.error(error.message);
        }
    });
    
});
