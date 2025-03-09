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

    const val = {
        mood: parseFloat(localStorage.getItem('mood')),
        productivity: parseFloat(localStorage.getItem('productivity')),
        stress: parseFloat(localStorage.getItem('stress')),
    }

    function getMood(mood) {
        if (mood <= 3) {
            return "over the moon.png";
        } else if (mood <= 6) {
            return "at peace.png";
        } else if (mood <= 10) {
            return "worn out.png";
        }
    }

    function getProductivity(productivity) {
        if (productivity <= 3) {
            return "in the zone.png";
        } else if (productivity <= 6) {
            return "steady flow.png";
        } else if (productivity <= 10) {
            return "barely moving.png";
        }
    }

    function getStress(stress) {
        if (stress <= 3) {
            return "not stressin.png"; 
        } else if (stress <= 6) {
            return "feelin' stuffy.png";
        } else if (stress <= 10) {
            return "maxed out.png";
        }
    }
});
