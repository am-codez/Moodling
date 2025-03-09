document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider");
    const blobImage = document.getElementById("blobImage");
    const nextButton = document.querySelector(".next-button"); // Ensure button is selected


    let lastImage = ""; // Store the last image to detect transitions

    // Function to map slider values to image filenames
    function getImage(value) {
        if (value <= 1.5) {
            return "cmd-f.png";  // Happy blob   
        } else if (value <= 3) {
            return "cmd-f2.png"; // Neutral blob    
        } else if (value <= 5) {
            return "cmd-f3.png";
        } else if (value <= 8) {
            return "cmd-f4.png"; // Sad blob  
        } else {
            return "sleepy.png";
        }
    }
    

    // Function to update the image and trigger animation only on transition
    function updateBlobImage() {
        let value = parseInt(slider.value);
        let newImage = getImage(value);

        if (newImage !== lastImage) { // Only animate if image changes
            blobImage.src = newImage;
            lastImage = newImage; // Update last image state

            // Remove animation, force reflow, then re-add it
            blobImage.classList.remove("bob-animation");
            void blobImage.offsetWidth; // Forces reflow
            blobImage.classList.add("bob-animation");
        }
    }

    // Attach event listener to update image and animate only on transition
    slider.addEventListener("input", updateBlobImage);

    // Initialize the correct image on page load
    updateBlobImage();

    // Function to update the slider track color dynamically
    function updateSliderTrack() {
        let value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #02B271 ${value}%, #ccc ${value}%)`;
    }

    // Attach event listener to update slider track
    slider.addEventListener("input", updateSliderTrack);

    // Initialize the slider track color on page load
    updateSliderTrack();

    nextButton.addEventListener("click", function () {
        localStorage.setItem("sleepHours", slider.value);
        window.location.href = "slider3.html"; // Change to the actual next page URL
    });
});
