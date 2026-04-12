document.addEventListener("DOMContentLoaded", () => {
    let miCarousel = new Carousel("caruselPrincipal");
    miCarousel.init();
});

class Carousel {
    constructor(carouselId, tickTimeInSeconds = 3) {
        this.carouselHolder = document.getElementById(carouselId);
        this.track = this.carouselHolder.querySelector(".track");
        this.slides = [...this.track.querySelectorAll(".slide")];

        this.maxLimit = this.slides.length - 1;
        this.currentIndex = 0;

        this.tickTime = tickTimeInSeconds * 1000;
        this.tickerId = null;
    }

    init() {
        this.generateNavigationUI(); // 👈 ahora sí se crean botones
        this.updatePosition();
        this.tick();
    }

    tick() {
        this.tickerId = setTimeout(() => {
            this.moveNext();
            this.tick();
        }, this.tickTime);
    }

    resetTick() {
        clearTimeout(this.tickerId);
        this.tick();
    }

    moveNext() {
        let newIndex = this.currentIndex + 1;

        if (newIndex > this.maxLimit) {
            newIndex = 0; // vuelve al inicio
        }

        this.moveTo(newIndex);
    }

    movePrev() {
        let newIndex = this.currentIndex - 1;

        if (newIndex < 0) {
            newIndex = this.maxLimit; // va al final
        }

        this.moveTo(newIndex);
    }

    moveTo(index) {
        this.currentIndex = index;
        this.updatePosition();
    }

    updatePosition() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    generateNavigationUI() {
        let btnLeft = document.createElement("button");
        let btnRight = document.createElement("button");

        btnLeft.classList.add("btn", "prev");
        btnRight.classList.add("btn", "next");

        btnLeft.innerHTML = "&#10094;";
        btnRight.innerHTML = "&#10095;";

        // EVENTOS
        btnLeft.addEventListener("click", (e) => {
            e.preventDefault();
            this.movePrev();
            this.resetTick(); // reinicia autoplay
        });

        btnRight.addEventListener("click", (e) => {
            e.preventDefault();
            this.moveNext();
            this.resetTick(); // reinicia autoplay
        });

        this.carouselHolder.appendChild(btnLeft);
        this.carouselHolder.appendChild(btnRight);
    }
}