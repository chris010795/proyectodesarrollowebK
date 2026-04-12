document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formReclamos");

    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const tipo = document.getElementById("tipo");
    const calificacion = document.getElementById("calificacion");
    const mensaje = document.getElementById("mensaje");
    const acepta = document.getElementById("acepta");
    const mensajeExito = document.getElementById("mensajeExito");

    // REGEX
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const regexTelefono = /^[0-9]{8}$/;

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        limpiarErrores();
        mensajeExito.textContent = "";

        let valido = true;

        // ===== NOMBRE =====
        if (nombre.value.trim() === "") {
            mostrarError("errorNombre", "Ingrese su nombre completo.");
            valido = false;
        } else if (nombre.value.trim().length < 3) {
            mostrarError("errorNombre", "El nombre debe tener al menos 3 caracteres.");
            valido = false;
        } else if (!regexNombre.test(nombre.value.trim())) {
            mostrarError("errorNombre", "El nombre solo debe contener letras.");
            valido = false;
        }

        // ===== TELEFONO =====
        if (telefono.value.trim() === "") {
            mostrarError("errorTelefono", "Ingrese su número de teléfono.");
            valido = false;
        } else if (!regexTelefono.test(telefono.value.trim())) {
            mostrarError("errorTelefono", "El teléfono debe tener 8 números.");
            valido = false;
        }

        // ===== TIPO =====
        if (tipo.value === "") {
            mostrarError("errorTipo", "Seleccione el tipo de comentario.");
            valido = false;
        }

        // ===== CALIFICACION =====
        if (calificacion.value === "") {
            mostrarError("errorCalificacion", "Seleccione una calificación.");
            valido = false;
        }

        // ===== MENSAJE =====
        if (mensaje.value.trim() === "") {
            mostrarError("errorMensaje", "Escriba el detalle de su comentario.");
            valido = false;
        } else if (mensaje.value.trim().length < 10) {
            mostrarError("errorMensaje", "El mensaje debe tener al menos 10 caracteres.");
            valido = false;
        }

        // ===== CHECKBOX =====
        if (!acepta.checked) {
            mostrarError("errorAcepta", "Debe confirmar la información.");
            valido = false;
        }

        // ===== EXITO =====
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