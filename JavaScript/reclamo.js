document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formReclamos");

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const tipo = document.getElementById("tipo");
    const calificacion = document.getElementById("calificacion");
    const mensaje = document.getElementById("mensaje");
    const acepta = document.getElementById("acepta");
    const mensajeExito = document.getElementById("mensajeExito");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        limpiarErrores();
        mensajeExito.textContent = "";

        let valido = true;

        if (nombre.value.trim() === "") {
            mostrarError("errorNombre", "Ingrese su nombre completo.");
            valido = false;
        }

        if (telefono.value.trim() === "") {
            mostrarError("errorTelefono", "Ingrese su número de teléfono.");
            valido = false;
        }

        if (tipo.value === "") {
            mostrarError("errorTipo", "Seleccione el tipo de comentario.");
            valido = false;
        }

        if (calificacion.value === "") {
            mostrarError("errorCalificacion", "Seleccione una calificación.");
            valido = false;
        }

        if (mensaje.value.trim() === "") {
            mostrarError("errorMensaje", "Escriba el detalle de su comentario.");
            valido = false;
        } else if (mensaje.value.trim().length < 10) {
            mostrarError("errorMensaje", "El mensaje debe tener al menos 10 caracteres.");
            valido = false;
        }

        if (!acepta.checked) {
            mostrarError("errorAcepta", "Debe confirmar la información.");
            valido = false;
        }

        if (valido) {
            mensajeExito.textContent = "Su encuesta fue enviada correctamente.";
            formulario.reset();
        }
    });

    function mostrarError(id, mensaje) {
        document.getElementById(id).textContent = mensaje;
    }

    function limpiarErrores() {
        const errores = document.querySelectorAll(".error");
        errores.forEach((error) => {
            error.textContent = "";
        });
    }
});