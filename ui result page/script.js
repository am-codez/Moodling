// document.addEventListener("DOMContentLoaded", function () {
//     const stars = document.querySelectorAll(".star");

//     stars.forEach(star => {
//         star.addEventListener("click", function () {
//             const rating = parseInt(this.getAttribute("data-value"));

//             // Highlight all stars up to the selected rating
//             stars.forEach((s, index) => {
//                 s.classList.toggle("active", index < rating);
//             });
//         });
//     });

//     const val = {
//         mood: parseFloat(localStorage.getItem('mood')),
//         productivity: parseFloat(localStorage.getItem('productivity')),
//         stress: parseFloat(localStorage.getItem('stress')),
//     }

//     function getMood(mood) {
//         if (mood <= 3) {
//             return "over the moon.png";
//         } else if (mood <= 6) {
//             return "at peace.png";
//         } else if (mood <= 10) {
//             return "worn out.png";
//         }
//     }

//     function getProductivity(productivity) {
//         if (productivity <= 3) {
//             return "in the zone.png";
//         } else if (productivity <= 6) {
//             return "steady flow.png";
//         } else if (productivity <= 10) {
//             return "barely moving.png";
//         }
//     }

//     function getStress(stress) {
//         if (stress <= 3) {
//             return "not stressin.png"; 
//         } else if (stress <= 6) {
//             return "feelin' stuffy.png";
//         } else if (stress <= 10) {
//             return "maxed out.png";
//         }
//     }
// });
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

    // Retrieve stored values
    const result = JSON.parse(localStorage.getItem("Result"));

    if (!result) {
        console.error("No prediction data found in localStorage.");
        return;
    }

    console.log("Loaded Result:", result);

    // Image selection functions
    function getMoodImage(mood) {
        if (mood > 6) {
            return "images/over the moon.png";
        } else if (mood > 3) {
            return "images/at peace.png";
        } else {
            return "images/worn out.png";
        }
    }

    function getProductivityImage(productivity) {
        if (productivity > 6) {
            return "images/in the zone.png";
        } else if (productivity > 3) {
            return "images/steady flow.png";
        } else {
            return "images/barely moving.png";
        }
    }

    function getStressImage(stress) {
        if (stress <= 3) {
            return "images/not stressin.png"; 
        } else if (stress <= 6) {
            return "images/feelin' stuffy.png";
        } else {
            return "images/maxed out.png";
        }
    }

    // Select all flip card images
    const flipCards = document.querySelectorAll(".flip-card img");

    // Ensure enough images are present in the HTML
    if (flipCards.length < 3) {
        console.error("Not enough images found in the document.");
        return;
    }

    // Update the images for mood, productivity, and stress
    flipCards[0].src = getMoodImage(result.mood);
    flipCards[1].src = getProductivityImage(result.productivity);
    flipCards[2].src = getStressImage(result.stress);

    // Add labels for debugging
    flipCards[0].alt = `Mood: ${result.mood}`;
    flipCards[1].alt = `Productivity: ${result.productivity}`;
    flipCards[2].alt = `Stress: ${result.stress}`;

    console.log("Updated images successfully!");
});
