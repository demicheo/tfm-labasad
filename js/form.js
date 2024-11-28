// CAMBIO DE CURSOR

const cursor = document.querySelector(".cursor");
const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const mouse = { x: pos.x, y: pos.y };
const speed = 1;

function updateCursor() {
  const dx = mouse.x - pos.x;
  const dy = mouse.y - pos.y;
  pos.x += dx * speed;
  pos.y += dy * speed;
  gsap.set(cursor, { x: pos.x - cursor.clientWidth / 2, y: pos.y - cursor.clientHeight / 2 });
  requestAnimationFrame(updateCursor);
}

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

updateCursor();

// Variables globales
const btnStart = document.querySelector('.go-btn');
const btnContinue = document.querySelectorAll('.btn-go');
const btnBack = document.querySelectorAll('.btn-back');
const sections = document.querySelectorAll('.section-form');
const progressBar = document.querySelector('.progress');
const progress = document.querySelector('.contenido');
let currentSectionIndex = 0;

// Función para mostrar la barra de progreso y la primera sección
btnStart.addEventListener('click', () => {
    progressBar.classList.remove('inactive');
    sections[0].classList.remove('inactive');
    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
});

// Función para manejar el botón "continuar"
btnContinue.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        currentSectionIndex++;

        if (currentSectionIndex < sections.length) {
            sections[currentSectionIndex].classList.remove('inactive');

        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }

        progress.style.transform = `scaleX(${currentSectionIndex*30 / 100})`;

        console.log(currentSectionIndex);
        if (currentSectionIndex == 3) {
            progress.style.transform = `scaleX(${100})`;
        }
    });
});
// Función para manejar el botón "atrás" aunque no funciona mu bien que se diga
btnBack.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        currentSectionIndex--;
        if (currentSectionIndex < sections.length) {

        sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
        }
        progress.style.transform = `scaleX(${currentSectionIndex*10 / 100})`;

        if(currentSectionIndex == 3) {
        progress.style.transform = `scaleX(${100})`;

        }

    });
});



