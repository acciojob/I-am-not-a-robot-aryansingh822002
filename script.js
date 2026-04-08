//your code here
const imageContainer = document.getElementById("image-container");
const resultPara = document.getElementById("para");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const heading = document.getElementById("h");

let selectedImages = [];
let imgClasses = ["img1", "img2", "img3", "img4", "img5"];

// Initialize the game
function init() {
    // 1. Reset state
    imageContainer.innerHTML = "";
    resultPara.innerText = "";
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";

    // 2. Pick a random image to repeat and create the array of 6 classes
    const repeatClass = imgClasses[Math.floor(Math.random() * imgClasses.length)];
    const combinedClasses = [...imgClasses, repeatClass];

    // 3. Shuffle the array (Fisher-Yates shuffle)
    for (let i = combinedClasses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combinedClasses[i], combinedClasses[j]] = [combinedClasses[j], combinedClasses[i]];
    }

    // 4. Create and append images to the DOM
    combinedClasses.forEach((className, index) => {
        const img = document.createElement("img");
        img.className = className;
        // Adding a custom attribute to identify which instance it is
        img.setAttribute("data-index", index); 
        img.addEventListener("click", handleImageClick);
        imageContainer.appendChild(img);
    });
}

function handleImageClick(e) {
    const clickedImg = e.target;

    // Prevent clicking the same image twice or clicking more than 2
    if (clickedImg.classList.contains("selected") || selectedImages.length >= 2) {
        return;
    }

    // Mark as selected
    clickedImg.classList.add("selected");
    selectedImages.push(clickedImg);

    // Show reset button on first click
    if (selectedImages.length > 0) {
        resetButton.style.display = "inline-block";
    }

    // Show verify button only when exactly two are selected
    if (selectedImages.length === 2) {
        verifyButton.style.display = "inline-block";
    } else {
        verifyButton.style.display = "none";
    }
}

// Reset Logic
resetButton.addEventListener("click", init);

// Verify Logic
verifyButton.addEventListener("click", () => {
    const [img1, img2] = selectedImages;

    if (img1.className === img2.className) {
        resultPara.innerText = "You are a human. Congratulations!";
    } else {
        resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyButton.style.display = "none";
});

// Run on load
init();