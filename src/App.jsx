let index = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;

function nextSlide() {
    index++;

    if (index >= totalSlides) {
        index = 0;
    }

    slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(nextSlide, 3000);