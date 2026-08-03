const bgs = document.querySelectorAll(".back1, .back2");
const cards = document.querySelectorAll(".card");
const overlay = document.querySelector(".overlay");

const isMobile =
    window.matchMedia("(max-width:900px)").matches ||
    window.matchMedia("(pointer:coarse)").matches;

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

let activeCard = null;

/* BLUR */

function updateBlur(){
    const zoom = window.devicePixelRatio;
    const blur = 13 / zoom;
    bgs.forEach(bg=>{
        bg.style.filter=`blur(${blur}px)`;
    });
}

updateBlur();
window.addEventListener("resize",updateBlur);

/* PC */

if(!isMobile){
    document.addEventListener("mousemove",(e)=>{
        mouseX = (e.clientX/window.innerWidth-.5)*100;
        mouseY = (e.clientY/window.innerHeight-.5)*100;
    });

    function animate(){
        currentX += (mouseX-currentX)*0.05;
        currentY += (mouseY-currentY)*0.05;
        bgs.forEach(bg=>{
            bg.style.backgroundPosition= `${50+currentX}% ${50+currentY}%`;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* MOBILE */

/* MOBILE */

if (isMobile) {
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            if (activeCard !== card) {
                e.preventDefault();
                activeCard = card;
                overlay.classList.add("show");
                cards.forEach(c => {
                    c.classList.remove("active");
                    c.classList.remove("hide");
                });
                card.classList.add("active");
                cards.forEach(c => {
                    if (c !== card) {
                        c.classList.add("hide");
                    }
                });
                return;
            }
        });
    });

    overlay.addEventListener("click", () => {
        activeCard = null;
        overlay.classList.remove("show");
        cards.forEach(c => {
            c.classList.remove("active");
            c.classList.remove("hide");
        });
    });
}

/* GIROSCÓPIO */

if(isMobile && window.DeviceOrientationEvent){
    window.addEventListener("deviceorientation",(e)=>{
        if(e.gamma==null)return;
        currentX += (e.gamma-currentX)*0.03;
        currentY += (e.beta-currentY)*0.03;
        bgs.forEach(bg=>{
            bg.style.backgroundPosition=`${50+currentX*0.5}% ${50+currentY*0.25}%`;
        });
    });
}