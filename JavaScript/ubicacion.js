document.addEventListener("DOMContentLoaded", () => {

    console.log("Página de ubicación cargada");

    const telefono = "+50498414321";

    const btnLlamar = document.getElementById("btnLlamar");

    if (btnLlamar) {
        btnLlamar.addEventListener("click", () => {
            window.location.href = "tel:" + telefono;
        });
    }

});