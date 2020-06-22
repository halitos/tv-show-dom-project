//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById("root");
  main.innerHTML = `<div id="search-episodes">
  <span class="search-bar">Search episodes</span>
  <input type="search" class="search-episodes" placeholder="Search ...">
  </div>`;

  const container = document.createElement("div");
  container.id = "cardContainer";

  episodeList.forEach(function (episode, index) {
    const episodeCard = document.createElement("div");
    episodeCard.className = "card";

    const cardHead = document.createElement("div");
    cardHead.id = "cardHeader";
    episodeCard.appendChild(cardHead);

    const episodeTitle = document.createElement("h3");
    episodeTitle.id = "name";
    cardHead.appendChild(episodeTitle);

    const seasonNum = document.createElement("h4");
    seasonNum.id = "seriNum";
    cardHead.appendChild(seasonNum);

    const episodeImg = document.createElement("img");
    episodeImg.id = "image";
    episodeCard.appendChild(episodeImg);

    const episodeSum = document.createElement("p");
    episodeSum.id = "summary";
    episodeCard.appendChild(episodeSum);

    episodeTitle.textContent = episode.name;
    seasonNum.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    episodeImg.setAttribute("src", episode.image.medium);
    episodeSum.textContent = episode.summary;
    episodeCard.id = "card" + index;
    container.appendChild(episodeCard);
    main.appendChild(container);

    const searchBox = document.querySelector(".search-episodes");
    searchBox.addEventListener("keypress", function () {
      if (
        (searchBox.value.length > 1) &
        !episode.name.toLowerCase().includes(searchBox.value.toLowerCase()) &
        !episode.summary.toLowerCase().includes(searchBox.value.toLowerCase())
      ) {
        episodeCard.style.display = "none";
      }
    });
  });
}

window.onload = setup;
