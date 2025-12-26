//Image Carousel Scripts
let currentIndex = 0;
function setupCarousel() {
    const images = document.querySelectorAll(".carousel-images img");
    const totalImages = images.length;

    function showSlide(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    window.moveSlide = function (direction) {
        currentIndex += direction;
        if (currentIndex >= totalImages) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        }
        showSlide(currentIndex);
    };

    showSlide(currentIndex);
}

document.addEventListener("DOMContentLoaded", setupCarousel);
