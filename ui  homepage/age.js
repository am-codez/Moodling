document.addEventListener("DOMContentLoaded", function () {
    const nextButton = document.querySelector(".next-button");
    const ageInput = document.getElementById("age-input");

    nextButton.addEventListener("click", function (event) {
        const age = ageInput.value.trim();

        if (age === "" || isNaN(age) || age < 0 || age > 120) {
            alert("Please enter a valid age between 0 and 120.");
            event.preventDefault(); // Prevent navigation if the input is invalid
        } else {
            localStorage.setItem("age", age);
        }

        window.location.href = "../ui slider pages/slider.html";
    });
});