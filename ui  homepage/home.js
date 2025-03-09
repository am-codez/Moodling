document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector(".next-button");

    // Attach event listener to update image and animate only on transition
    slider.addEventListener("input", () => {
    });

    // Navigate to next page while preserving state
    nextButton.addEventListener("click", function () {
        window.location.href = "../ui slider pages/slider.html"; 
    });

    // Initialize the slider and blob image
    loadStoredValue();
});
