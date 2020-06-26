//-----------------setup function-------------------
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const main = document.getElementById("root");

  //-----------create HTML for search menu-----------

  main.innerHTML = `<div id="search-episodes">
  <select id="episode-selector"><option value="none">See all episodes</option></select>
  <input type="search" class="search-episodes" placeholder="Search episodes...">
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
    const option = `<option>S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    } </option>`;
    selector.innerHTML += option;
  });

  selector.addEventListener("change", function () {
    if (selector.value !== "none") {
      const selectedEpisodes = episodeList.filter((episode) => {
        const result = `S0${episode.season}E0${episode.number} - ${episode.name}`;
        return result === selector.value;
      });
      makePageForEpisodes(selectedEpisodes);
    } else {
      makePageForEpisodes(episodeList);
    }
  });
}

window.onload = setup;

// selector.addEventListener("change", function () {
//   let episodes = [...container.children];
//   let selectorVal = selector.value.toLowerCase();
//   episodes.forEach(function (episode) {
//     const episodeText = episode.innerText;
//     if (episodeText.indexOf(selectorVal) > -1) {
//       episode.style.display = "";
//     } else {
//       episode.style.display = "none";
//     }
//   });
// });
