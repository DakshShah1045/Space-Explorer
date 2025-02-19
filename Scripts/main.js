const carousel = document.querySelector('.carousel');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        let currentSlide = 0;

        function updateCarousel() {
            const offset = -currentSlide * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + carousel.children.length) % carousel.children.length;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % carousel.children.length;
            updateCarousel();
        });