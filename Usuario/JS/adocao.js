document.addEventListener("DOMContentLoaded", function () {
  // Função para gerar as tags de características
  function createTagsHtml(animal) {
    let tagsHtml = "";
    if (animal.gender === "female") {
      tagsHtml += `<span class="animal-tag gender-female">Fêmea</span>`;
    } else {
      tagsHtml += `<span class="animal-tag gender-male">Macho</span>`;
    }
    if (animal.isVaccinated) {
      tagsHtml += `<span class="animal-tag status-vaccinated">Vacinado</span>`;
    }
    if (animal.isNeutered) {
      tagsHtml += `<span class="animal-tag status-neutered">Castrado</span>`;
    }
    return tagsHtml;
  }

  // Função para abrir e preencher o modal
  function openModal(animal) {
    document.getElementById("modal-animal-image").src = animal.image;
    document.getElementById(
      "modal-animal-image"
    ).alt = `Foto de ${animal.name}`;
    document.getElementById("modal-animal-name").textContent = animal.name;
    document.getElementById("modal-animal-age").textContent = animal.age;
    document.getElementById("modal-animal-size").textContent = animal.size;
    document.getElementById("modal-animal-gender").textContent =
      animal.gender === "female" ? "Fêmea" : "Macho";
    document.getElementById("modal-animal-neutered").textContent =
      animal.isNeutered ? "Sim" : "Não";
    document.getElementById("modal-animal-vaccinated").textContent =
      animal.isVaccinated ? "Sim" : "Não";
    document.getElementById("modal-animal-temperament").textContent =
      animal.temperament;

    // Exibe o modal
    document.getElementById("animal-modal").style.display = "flex";
  }

  // Função para fechar o modal
  function closeModal() {
    document.getElementById("animal-modal").style.display = "none";
  }

  // Adiciona eventos para fechar o modal
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document
    .querySelector(".modal-overlay")
    .addEventListener("click", (event) => {
      // Fecha o modal apenas se o clique for no fundo (overlay) e não no conteúdo
      if (event.target === document.querySelector(".modal-overlay")) {
        closeModal();
      }
    });

  // Função principal para buscar dados e construir a página
  async function initializePage() {
    const container = document.getElementById("animal-list");
    try {
      const response = await fetch("../JSON/adocao.json");
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      const animals = await response.json();

      // Preenche o container com os cards dos animais
      animals.forEach((animal) => {
        const card = document.createElement("a");
        card.className = "animal-card";
        card.href = "#";
        card.dataset.animalId = animal.id;

        const cardHtml = `
          <img src="${animal.image}" alt="Foto de ${animal.name}" />
          <div class="animals-button-text-container">
            <div class="animal-attribute-row"><span class="animals-button-characteristics">Nome: </span><span class="animals-button-definitions">${
              animal.name
            }</span></div>
            <div class="animal-attribute-row"><span class="animals-button-characteristics">Idade: </span><span class="animals-button-definitions">${
              animal.age
            }</span></div>
            <div class="animal-attribute-row"><span class="animals-button-characteristics">Porte: </span><span class="animals-button-definitions">${
              animal.size
            }</span></div>
            <div class="animal-tags-container">${createTagsHtml(animal)}</div>
          </div>
        `;
        card.innerHTML = cardHtml;
        container.appendChild(card);
      });

      // Adiciona o event listener ao container após os cards serem criados
      container.addEventListener("click", function (event) {
        event.preventDefault();
        const clickedCard = event.target.closest(".animal-card");
        if (clickedCard) {
          const animalId = clickedCard.dataset.animalId;
          const selectedAnimal = animals.find(
            (animal) => animal.id.toString() === animalId
          );
          if (selectedAnimal) {
            openModal(selectedAnimal);
          }
        }
      });
    } catch (error) {
      console.error("Falha ao carregar os dados dos animais:", error);
      container.innerHTML =
        "<p style='text-align: center; color: #b30000;'>Não foi possível carregar a lista de animais. Tente novamente mais tarde.</p>";
    }
  }

  initializePage();
});
