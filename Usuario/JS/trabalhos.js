document.addEventListener("DOMContentLoaded", function () {
  // No futuro, estes dados virão de uma API/banco de dados.
  // Por enquanto, usamos um array de objetos para simular.
  const mockNews = [
    {
      link: "#", // Link para a notícia completa
      imageSrc: "../../imagens/foto1.jpeg",
      imageAlt: "Pessoas limpando uma praça",
      date: "15 de Julho, 2024",
      title: "Mutirão de limpeza e conscientização no bairro central",
      summary: "Voluntários se reuniram no último sábado para um grande mutirão de limpeza na praça principal, removendo lixo e conscientizando a população sobre o descarte correto.",
    },
    {
      link: "#",
      imageSrc: "../../imagens/foto2.jpeg",
      imageAlt: "Cachorro sendo adotado em uma feira",
      date: "02 de Julho, 2024",
      title: "Feira de adoção responsável encontra lar para 15 animais",
      summary: "A feira de adoção realizada em parceria com a prefeitura foi um sucesso, com 10 cães e 5 gatos encontrando novas famílias amorosas.",
    },
  ];

  const newsContainer = document.getElementById("news-list");

  if (newsContainer) {
    newsContainer.innerHTML = ""; // Limpa o container

    mockNews.forEach((newsItem) => {
      const newsCard = document.createElement("a");
      newsCard.href = newsItem.link;
      newsCard.className = "news-card";

      // Cria e anexa a imagem
      const img = document.createElement("img");
      img.src = newsItem.imageSrc;
      img.alt = newsItem.imageAlt;
      newsCard.appendChild(img);

      // Cria o container para o texto
      const textContentDiv = document.createElement("div");
      textContentDiv.className = "news-text-content";

      // Cria e anexa a data
      const dateSpan = document.createElement("span");
      dateSpan.className = "news-date";
      dateSpan.textContent = newsItem.date;
      textContentDiv.appendChild(dateSpan);

      // Cria e anexa o título
      const titleH3 = document.createElement("h3");
      titleH3.className = "news-title";
      titleH3.textContent = newsItem.title;
      textContentDiv.appendChild(titleH3);

      // Cria e anexa o resumo
      const summaryP = document.createElement("p");
      summaryP.className = "news-summary";
      summaryP.textContent = newsItem.summary;
      textContentDiv.appendChild(summaryP);

      // Anexa o container de texto ao card principal
      newsCard.appendChild(textContentDiv);

      newsContainer.appendChild(newsCard);
    });
  }
});
