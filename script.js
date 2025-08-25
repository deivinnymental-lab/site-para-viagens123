/* ===============================
    CARROSSEL ARRASTÁVEL
================================ */
const carousels = document.querySelectorAll(".destinos-carousel");
carousels.forEach((carousel) => {
  let isDragging = false,
    startX,
    scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.classList.add("dragging");
  });

  carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  });

  carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // velocidade do scroll
    carousel.scrollLeft = scrollLeft - walk;
  });
});

/* ===============================
    FILTROS POR CONTINENTE
================================ */
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const continent = button.getAttribute("data-continent");
    const carouselItems = document.querySelectorAll(".carousel-item");

    carouselItems.forEach((item) => {
      if (
        continent === "todos" ||
        item.getAttribute("data-continent") === continent
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

/* ===============================
    FUNDO ANIMADO (NUVENS E PARTÍCULAS TROPICAIS)
================================ */
const canvas = document.getElementById("canvas-bg");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = Math.floor(canvas.width / 10);
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let speedX = (Math.random() - 0.5) * 0.5;
    let speedY = (Math.random() - 0.5) * 0.5;
    let color = "rgba(255, 255, 255, 0.6)";
    particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

/* ===============================
    BOTÕES DE VIAJAR ALEATÓRIOS
================================ */
const travelButtons = document.querySelectorAll(".btn-travel");
const travelSites = [
  "https://www.decolar.com",
  "https://www.booking.com",
  "https://www.expedia.com",
  "https://www.airbnb.com"
];

travelButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const destinationLink = button.getAttribute("href");
    // Escolhe aleatoriamente outro site se quiser
    let randomSite =
      travelSites[Math.floor(Math.random() * travelSites.length)];
    window.open(destinationLink, "_blank");
  });
});

/* ===============================
    SCROLL SUAVE PARA NAVBAR
================================ */
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ===============================
    EFEITOS DE HOVER ADICIONAIS
================================ */
const carouselItems = document.querySelectorAll(".carousel-item");

carouselItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "scale(1.05) translateY(-5px)";
    item.style.boxShadow = "0 25px 50px rgba(0,0,0,0.2)";
  });
  item.addEventListener("mouseleave", () => {
    item.style.transform = "scale(1) translateY(0)";
    item.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
  });
});

/* ===============================
    ANIMAÇÃO DE FADE IN AO SCROLL
================================ */
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
