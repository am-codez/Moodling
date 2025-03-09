document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider");
    const blobImage = document.getElementById("blobImage");

    let lastImage = ""; // Store the last image to detect transitions

    // Function to map slider values to image filenames
    function getImage(value) {
        if (value <= 3) {
            return "cmd-f.png";  // Happy blob (Low screen time)
        } else if (value <= 6) {
            return "cmd-f2.png"; // Neutral blob (Medium screen time)
        } else {
            return "cmd-f3.png"; // Sad blob (High screen time)
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
        localStorage.setItem("caffeineIntake", slider.value);
        createItem();
        window.location.href = "../ui result page/results.html"; // Change to the actual next page URL
    });

    const createItem = async () => {
        const newItem = await {
            age: window.localStorage.getItem('age'),
            sleepHours: window.localStorage.getItem('sleepHours'),
            exerciseHours: window.localStorage.getItem('exerciseHours'),
            caffeinIntake: window.localStorage.getItem('caffeinIntake'),
            screenTime: window.localStorage.getItem('screenTime'),
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            window.localStorage.setItem("Result", data);
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
});
