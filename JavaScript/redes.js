document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".social-card");
    cards.forEach(function (card) {
        let link = card.querySelector("a");
        link.onclick = function (e) {
            let url = link.getAttribute("href");
            if (!url || url === "#") {
                e.preventDefault();
                alert("Este enlace no está disponible");
                return;
            }
            card.classList.add("clicked");
            setTimeout(function () {
                card.classList.remove("clicked");
            }, 150);
        };
    });
});