document.addEventListener("DOMContentLoaded", () => {

    const productos = document.querySelectorAll(".card-producto");

    productos.forEach((producto) => {
        producto.addEventListener("click", () => {
            alert("Producto seleccionado: " + producto.querySelector("h3").textContent);
        });
    });

});