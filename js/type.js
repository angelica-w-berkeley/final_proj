const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

const typeSpan = document.querySelector(".type");
const cursorSpan = document.querySelector(".cursor");

const typeArray = ["a UX designer ", "a California native ", "an amateur photographer ", "an ice cream lover "];
const typeDelay = 90;
const eraseDelay = 75;
const newTypeDelay = 2000;
let typeArrayIndex = 0;
let charIndex = 0;

const design = '<i class="material-icons type-icon" id="design">design_services</i>';
const beach = '<i class="material-icons type-icon" id="beach">sunny</i>';
const camera = '<i class="material-icons type-icon" id="camera">photo_camera</i>';
const iceCream = '<i class="material-icons type-icon" id="icecream">icecream</i>';

function type() {
    if (charIndex < typeArray[typeArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typeSpan.textContent += typeArray[typeArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typeDelay);
    }
    else {
        if (typeArrayIndex == 0) {
            typeSpan.insertAdjacentHTML("afterend", design);
        }
        else if (typeArrayIndex == 1) {
            typeSpan.insertAdjacentHTML("afterend", beach);
        }
        else if (typeArrayIndex == 2) {
            typeSpan.insertAdjacentHTML("afterend", camera);
        }
        else {
            typeSpan.insertAdjacentHTML("afterend", iceCream);
        }
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTypeDelay);
    }
}

function erase() {
    if (charIndex == typeArray[typeArrayIndex].length) {
        let icon = null;
        if (typeArrayIndex == 0) {
            icon = document.getElementById("design");
        }
        else if (typeArrayIndex == 1) {
            icon = document.getElementById("beach");
        }
        else if (typeArrayIndex == 2) {
            icon = document.getElementById("camera");
        }
        else {
            icon = document.getElementById("icecream");
        }
        icon.remove();
    }
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) {
            cursorSpan.classList.add("typing");
        }
        typeSpan.textContent = typeArray[typeArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, eraseDelay);
    }
    else {
        cursorSpan.classList.remove("typing");
        typeArrayIndex++;
        if (typeArrayIndex >= typeArray.length) {
            typeArrayIndex = 0;
        }
        setTimeout(type, typeDelay + 1100);
    }
}

if (isReduced) {
    console.log("reduced");
    typeSpan.textContent += typeArray[typeArrayIndex];
    typeSpan.insertAdjacentHTML("afterend", design);
    document.querySelector(".cursor").remove();
}
else {
    document.addEventListener("DOMContentLoaded", function() {
        if (typeArray.length) {
            setTimeout(type, 1000);
        }
    });
}