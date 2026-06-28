const background = document.querySelector(".background");

document.querySelector(".btn1").addEventListener("mouseenter", () => {
    background.style.backgroundImage = "url('imagensAlt/img1.png')";
});

document.querySelector(".btn2").addEventListener("mouseenter", () => {
    background.style.backgroundImage = "url('imagensAlt/img3.png')";
});

document.querySelector(".btn3").addEventListener("mouseenter", () => {
    background.style.backgroundImage = "url('imagensAlt/img2.png')";
});

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

function updateBlur() {
    const zoom = window.devicePixelRatio;
    const blur = 10 / zoom;

    background.style.filter = `blur(${blur}px)`;
}

updateBlur();

window.addEventListener("resize", updateBlur);

document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 100;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 100;
});

function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    background.style.backgroundPosition =
        `${50 + currentX}% ${50 + currentY}%`;

    requestAnimationFrame(animate);
}

animate();