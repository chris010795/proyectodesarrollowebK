document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll(".btn-map");
    buttons.forEach(function (button) {
        button.onclick = function () {
            let mapId = button.getAttribute("data-map");
            let container = document.getElementById(mapId);
            if (!container) {
                return;
            }
            if (container.style.display === "block") {
                container.style.display = "none";
                container.innerHTML = "";
                return;
            }
            container.style.display = "block";
            if (container.innerHTML === "") {
                let iframe = document.createElement("iframe");
                iframe.src = "https://www.google.com/maps?q=Honduras&output=embed";
                container.appendChild(iframe);
            }
        };
    });
});