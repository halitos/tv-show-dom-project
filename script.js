//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById("root");

  //-----------create HTML for search menu-----------

  main.innerHTML = `<div id="search-episodes">
  <span class="search-bar">Search episodes</span>
  <input type="search" class="search-episodes" placeholder="Search ..."><span id ="numOfDisplay"></span>
  </div>`;

  // -----------------populate cards-------------

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
    episodeSum.textContent = episode.summary.replace(/<[^>]*>/g, " ");
    episodeCard.id = "card" + index;
    container.appendChild(episodeCard);
    main.appendChild(container);
  });

  //---------------Search event---------------

  const searchBox = document.querySelector(".search-episodes");

  searchBox.addEventListener("keyup", function () {
    const searchBoxValue = searchBox.value.toLowerCase();
    const displayNum = document.getElementById("numOfDisplay");
    const cardList = document.querySelectorAll(".card");
    let newList = [];
    newList = cardList.forEach(function (card) {
      if (card.innerText.toLowerCase().indexOf(searchBoxValue) > -1) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
      displayNum.innerText = ` Displaying ${newList.length}/${episodeList.length} episodes`;
    });
  });
}

window.onload = setup;
