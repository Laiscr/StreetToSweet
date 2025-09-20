document.addEventListener("DOMContentLoaded", function () {
  // ---- PASSO IMPORTANTE ----
  // Quando o banco de dados estiver pronto, você substituirá este array
  // por uma chamada `fetch` para a sua API, que retornará os dados no mesmo formato.
  const mockCampaigns = [
    {
      year: 2025,
      imageSrc: "../../imagens/campanhaCastracao2025.png",
      imageAlt: "Campanha de Castração 2025",
      status: "ongoing",
      link: "detalhes-castracao.html", // Link para a página de detalhes
    },
    {
      year: 2024,
      imageSrc: "../../imagens/campanhaAntirrabica2024.png",
      imageAlt: "Campanha Antirrábica 2024",
      status: "closed",
      link: "#", // Link não funcional para campanhas encerradas
    },
  ];

  const campaignsContainer = document.getElementById("campaigns-list");

  if (campaignsContainer) {
    // Limpa o container caso haja algum conteúdo residual (boa prática)
    campaignsContainer.innerHTML = "";

    // Itera sobre cada campanha e cria o HTML correspondente
    mockCampaigns.forEach((campaign) => {
      const campaignItem = document.createElement("div");
      campaignItem.className = "campaign-item";

      // Cria e anexa o ano da campanha
      const yearSpan = document.createElement("span");
      yearSpan.className = "campaign-year";
      yearSpan.textContent = campaign.year;
      campaignItem.appendChild(yearSpan);

      // Cria o card com a imagem
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      const img = document.createElement("img");
      img.src = campaign.imageSrc;
      img.alt = campaign.imageAlt;
      cardDiv.appendChild(img);
      campaignItem.appendChild(cardDiv);

      // Cria o link de status
      const statusLink = document.createElement("a");
      statusLink.href = campaign.link;
      const statusClass =
        campaign.status === "ongoing" ? "status-ongoing" : "status-closed";
      const statusText =
        campaign.status === "ongoing" ? "Em andamento" : "Encerrada";
      statusLink.className = `campaign-status ${statusClass}`;
      statusLink.textContent = statusText;
      campaignItem.appendChild(statusLink);

      // Adiciona o item de campanha recém-criado ao contêiner na página
      campaignsContainer.appendChild(campaignItem);
    });
  }
});