const overlay = document.querySelector(".overlay");
const background = document.querySelector(".background");
const cards = document.querySelectorAll(".btn11, .btn22, .btn33");
const backButton = document.querySelector(".vlt");


/*DETEC PC / MOBILE*/

const isMobile = window.matchMedia("(max-width:900px)").matches || window.matchMedia("(pointer:coarse)").matches;

/*VARIÁVEIS*/

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

let activeCard = null;

/*IMG DOS PROJETOS*/

const backgrounds = {
    btn11: "url('imagensAlt/img1.png')",
    btn22: "url('imagensAlt/img3.png')",
    btn33: "url('imagensAlt/img2.png')"
};


/*TROCAR BACKGROUND*/

function changeBackground(card) {
    if (!card) return;
    const image = backgrounds[
        [...card.classList].find(
            className => backgrounds[className]
        )
    ];

    if (image) {
        background.style.backgroundImage = image;
    }
}


/*BLUR*/

function updateBlur() {
    const zoom = window.devicePixelRatio;
    const blur = 10 / zoom;
    background.style.filter = `blur(${blur}px)`;
}

updateBlur();
window.addEventListener("resize", updateBlur);

/*PC*/

if (!isMobile) {

    /*MOUSE*/

    document.addEventListener("mousemove", (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 100;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 100;
        }
    );

    /*HOVER DOS CARDS*/

    cards.forEach(card => { card.addEventListener("mouseenter", () => {
                changeBackground(card);
            }
        );
    });

    /*PARALLAX*/

    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        background.style.backgroundPosition = `${50 + currentX}% ${50 + currentY}%`;
        requestAnimationFrame(animate);
    }
    animate();
}

/*MOBILE*/

if (isMobile) {
    cards.forEach(card => { card.addEventListener("click", (e) => {

                /*PRIMEIRO TOQUE*/

                if (activeCard !== card) {e.preventDefault();
                    activeCard = card;
                    overlay.classList.add("show");
                    
                    /*TROCA BACKGROUND*/

                    changeBackground(card);

                    /*REMOVE ESTADOS*/

                    cards.forEach(c => {
                        c.classList.remove("active");
                        c.classList.remove("hide");
                    });

                    /*ATIVA CARD*/

                    card.classList.add("active");

                    /*ESCONDE OS OUTROS*/

                    cards.forEach(c => {
                        if (c !== card) {
                            c.classList.add("hide");
                        }
                    });
                    return;
                }

                /*SEGUNDO TOQUE, DEIXA O LINK FUNCIONAR*/
            }
        );
    });

    /*CLICAR FORA DO CARD*/

    if (overlay) {
        overlay.addEventListener("click", () => {
                activeCard = null;
                overlay.classList.remove("show");

                cards.forEach(card => {
                    card.classList.remove("active");
                    card.classList.remove("hide");
                });
            }
        );
    }

    /*BOTÃO VOLTAR*/

    if (backButton) {
        backButton.addEventListener("click", () => {
                activeCard = null;
                if (overlay) {
                    overlay.classList.remove("show");
                }

                cards.forEach(card => {
                    card.classList.remove("active");
                    card.classList.remove("hide");
                });
            }
        );
    }
}