//-----------------setup function-------------------
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById("root");

  //-----------create HTML for search menu-----------

  main.innerHTML = `<div id="search-episodes">
  <span class="search-bar">Search episodes</span>
  <select id="episode-selector"><option></option></select>
  <input type="search" class="search-episodes" placeholder="Search ...">
  <span id ="numOfDisplay"></span>
  </div>`;

  // -----------------populate cards-------------

  const container = document.createElement("div");
  container.id = "cardContainer";
  let episodeNum;
  let episodeCard;

  episodeList.forEach(function (episode, index) {
    episodeCard = document.createElement("div");
    episodeCard.className = "card";

    const cardHead = document.createElement("div");
    cardHead.id = "cardHeader";
    episodeCard.appendChild(cardHead);

    const episodeTitle = document.createElement("h3");
    episodeTitle.id = "name";
    cardHead.appendChild(episodeTitle);

    episodeNum = document.createElement("h4");
    episodeNum.id = "seriNum";
    cardHead.appendChild(episodeNum);

    const episodeImg = document.createElement("img");
    episodeImg.id = "image";
    episodeCard.appendChild(episodeImg);

    const episodeSum = document.createElement("p");
    episodeSum.id = "summary";
    episodeCard.appendChild(episodeSum);

    episodeTitle.textContent = episode.name;
    episodeNum.textContent = `S${episode.season
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

  searchBox.addEventListener("input", function () {
    const searchBoxValue = searchBox.value.toLowerCase();
    const displayNum = document.getElementById("numOfDisplay");
    const cardList = document.querySelectorAll(".card");
    let newList = Array.from(cardList);
    newList.forEach(function (card) {
      if (card.innerText.toLowerCase().indexOf(searchBoxValue) > -1) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
    let filteredList = newList.filter((item) => item.style.display === "");
    displayNum.innerText = ` Displaying ${filteredList.length}/${episodeList.length} episodes`;
  });

  //---------------Select Menu------------------

  const selector = document.getElementById("episode-selector");
  episodeList.forEach((episode) => {
    const option = `<option>${episodeNum.textContent} - ${episode.name} </option>`;
    selector.innerHTML += option;
  });

  selector.addEventListener("change", function (event) {
    const episodeId = event.target.value;
    console.log(episodeId);
    episodeList.forEach((episode) => {
      if (!episode.name.includes(selector.innerText)) {
        episodeCard.style.display = "none";
      }
    });
  });
}

window.onload = setup;
