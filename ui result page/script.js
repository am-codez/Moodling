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

    function getImage(category, value) {
        const imageMap = {
            mood: {
                low: "images/worn out.png",
                mid: "images/at peace.png",
                high: "images/over the moon.png"
            },
            productivity: {
                low: "images/barely moving.png",
                mid: "images/steady flow.png",
                high: "images/in the zone.png"
            },
            stress: {
                low: "images/not stressin.png",
                mid: "images/feelin' stuffy.png",
                high: "images/maxed out.png"
            }
        };

        if (value <= 3) return imageMap[category].low;
        if (value <= 6) return imageMap[category].mid;
        return imageMap[category].high;
    }

    // Select the flip card images (front & back)
    const flipCardFronts = document.querySelectorAll(".flip-card-front img");
    const flipCardBacks = document.querySelectorAll(".flip-card-back img");

    if (flipCardFronts.length < 3 || flipCardBacks.length < 3) {
        console.error("Not enough images found in the document.");
        return;
    }
    // Update the **back** images for mood, productivity, and stress
    flipCardBacks[0].src = getImage("mood", result.mood);
    flipCardBacks[1].src = getImage("stress", result.stress);
    flipCardBacks[2].src = getImage("productivity", result.productivity);

    console.log("Updated images successfully!");
});
