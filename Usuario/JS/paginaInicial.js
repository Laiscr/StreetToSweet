let index = 0;
let interval;

const carousel = document.querySelector(".carousel");
const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slides img").length;
const dotsContainer = document.querySelector(".dots");

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dots span");

// Controle do Carrossel
function updateCarousel() {
  // Move o contêiner de slides para a esquerda
  slides.style.transform = `translateX(-${index * 100}%)`;

  // Atualiza a bolinha ativa
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Passagem automática
function startAutoPlay() {
  interval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  clearInterval(interval);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

// Para a passagem automática quando o usuário coloca o mouse no carrossel
carousel.addEventListener("mouseenter", stopAutoPlay);
carousel.addEventListener("mouseleave", startAutoPlay);

updateCarousel(); // Garante que o estado inicial (primeiro slide e dot) esteja correto
startAutoPlay();

// Lógica para o Modal de Mantimentos

const openModalLink = document.getElementById("open-mantimentos-modal");
const mantimentosModal = document.getElementById("mantimentos-modal");

// Garante que o modal e o link existem antes de adicionar os eventos
if (openModalLink && mantimentosModal) {
  const closeModalButton = mantimentosModal.querySelector(".modal-close");

  // Função para abrir o modal
  openModalLink.addEventListener("click", function (event) {
    event.preventDefault(); // Impede que o link '#' navegue para o topo da página
    mantimentosModal.style.display = "flex";
  });

  // Função para fechar o modal pelo botão 'X'
  closeModalButton.addEventListener("click", function () {
    mantimentosModal.style.display = "none";
  });

  // Função para fechar o modal clicando fora dele (no overlay)
  mantimentosModal.addEventListener("click", function (event) {
    if (event.target === mantimentosModal) {
      mantimentosModal.style.display = "none";
    }
  });
}