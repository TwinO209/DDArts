const bgs = document.querySelectorAll(".back1, .back2");
const art = document.querySelector(".art");
const ddart = document.querySelector(".ddart");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

// Ajusta o blur conforme o zoom
function updateBlur() {
    const zoom = window.devicePixelRatio;
    const blur = 13 / zoom;

    bgs.forEach(bg => {
        bg.style.filter = `blur(${blur}px)`;
    });
}

updateBlur();

window.addEventListener("resize", updateBlur);

// Movimento do mouse
document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 100;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 100;
});

function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    bgs.forEach(bg => {
        bg.style.backgroundPosition =
            `${50 + currentX}% ${50 + currentY}%`;
    });

    const artX = currentX * 0.1;
    const artY = currentY * 0.1;

    requestAnimationFrame(animate);
}

animate();