document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");

    stars.forEach(star => {
        star.addEventListener("click", function () {
            const rating = parseInt(this.getAttribute("data-value"));

            // Highlight all stars up to the selected rating
            stars.forEach((s, index) => {
                s.classList.toggle("active", index < rating);
            });
        });
    });
});
