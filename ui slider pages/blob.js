document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider");
    const blobImage = document.getElementById("blobImage");
    const nextButton = document.querySelector(".next-button");

    // Store the last image to detect transitions
    let lastImage = ""; 

    // Function to map slider values to image filenames
    function getImage(value) {
        if (value <= 3) {
            return "cmd-f4.png";  // Happy blob (Low screen time)

        } else if (value <= 5) {
            return "cmd-f3.png"; // Neutral blob (Medium screen time)
        } else if (value <= 6) {
            return "cmd-f2.png";
        } else if (value <= 8) {
            return "cmd-f.png"; // Sad blob (High screen time)
        } else {
            return "screen time.png";
        }
    }

    // Function to update the image and trigger animation only on transition
    function updateBlobImage() {
        let value = parseFloat(slider.value);
        let newImage = getImage(value);

        if (newImage !== lastImage) { // Only animate if image changes
            blobImage.src = newImage;
            lastImage = newImage; // Update last image state

            // Remove animation, force reflow, then re-add it
            blobImage.classList.remove("bob-animation");
            void blobImage.offsetWidth; // Forces reflow
            blobImage.classList.add("bob-animation");
        }

        // Save slider value and selected image to localStorage
    }

    // Function to update the slider track color dynamically
    function updateSliderTrack() {
        let value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #02B271 ${value}%, #ccc ${value}%)`;
    }

    // Attach event listener to update image and animate only on transition
    slider.addEventListener("input", () => {
        updateBlobImage();
        updateSliderTrack();
    });

    // Load stored value on page load
    function loadStoredValue() {
        let storedValue = localStorage.getItem("screenTime");
        let storedImage = localStorage.getItem("blobImage");

        if (storedValue !== null) {
            slider.value = storedValue;
        }
        if (storedImage !== null) {
            blobImage.src = storedImage;
            lastImage = storedImage;
        }
        updateBlobImage();
        updateSliderTrack();
    }

    // Navigate to next page while preserving state
    nextButton.addEventListener("click", function () {
        localStorage.setItem("screenTime", slider.value);
        window.location.href = "slider2.html"; // Change to the actual next page URL
    });

    // Initialize the slider and blob imag
});
