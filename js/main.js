//Animación de burbujas
const links = document.querySelectorAll('.link-cont');

function iniciarVibracion(link) {
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 }); 

    const duration = Math.random() * 0.2 + 0.1; // Duración aleatoria (En teoría es para que no fuese todo a la vez pero no sé yo si será mejor hacer otra cosa)
    const angle = Math.random() * 3 + 5; // Ángulo de giro

    // prueba de llamar atención pero queda muy burda
    timeline.to(link, {
        rotation: angle,
        duration: duration,
        ease: "power1.inOut"
    }).to(link, {
        rotation: -angle,
        duration: duration,
        ease: "power1.inOut"
    }).to(link, {
        rotation: 0,
        duration: duration,
        ease: "power1.inOut"
    });

    // Pausar después de la vibración
    timeline.to(link, { duration: 0, paused: true }, "+=10"); 
}

// Aparición de burbujas
function animarAparicion() {
    const timeline = gsap.timeline();

    links.forEach((link, index) => {
        timeline.from(link, {
            opacity: 0,
            y: 50,  // posicion inicial mas baja
            duration: 0.8,
            delay: index * 0.2, // Retraso entre cada uno
            ease: "power1.out"
        });
    });

    // ordenar animaciones, primero aparece luego se mueve
    timeline.call(() => {
        links.forEach(link => {
            iniciarVibracion(link);
        });
    });
}

animarAparicion();
