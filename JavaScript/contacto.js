document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formContacto").addEventListener("submit", function(e) {
        e.preventDefault();

        let nombre = document.getElementById("nombre").value.trim();
        let correo = document.getElementById("correo").value.trim();

        let regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;
        let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let mensaje = document.querySelector("textarea").value.trim();

        if (nombre === "") {
            alert("El nombre no puede estar vacío");
            return;
        }

        if (!regexNombre.test(nombre)) {
            alert("El nombre solo debe contener letras y espacios");
            return;
        }

        if (correo === "") {
            alert("El correo no puede estar vacío");
            return;
        }

        if (!regexCorreo.test(correo)) {
            alert("Ingrese un correo válido");
            return;
        }

        if (mensaje === "") {
        alert("El mensaje no puede estar vacío");
        return;
        }
        
        alert("Formulario enviado correctamente");
        this.reset();

        
         document.getElementById("formContacto").reset();
    });
});