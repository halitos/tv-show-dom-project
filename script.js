//-------------setup function------------
function setup() {
  makePageForEpisodes(allEpisodes);
}

//---------------globals-----------------

const allEpisodes = getAllEpisodes();
const main = document.getElementById("root");
const selector = document.getElementById("episode-selector");
const searchBox = document.querySelector(".search-episodes");
let container;
let displayNum;

//---------load page with episode cards---------

function makePageForEpisodes(episodeList) {
  container = document.createElement("div");
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

    const episodeNum = document.createElement("h4");
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
}

//---------------Search event---------------

searchBox.addEventListener("input", function () {
  const searchBoxValue = searchBox.value.toLowerCase();
  displayNum = document.getElementById("numOfDisplay");
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
  displayNum.innerText = ` Displaying ${filteredList.length}/${allEpisodes.length} episodes`;
});

//---------Create Select Options--------------

allEpisodes.forEach((episode) => {
  const option = `<option>S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
    episode.name
  } </option>`;
  selector.innerHTML += option;
});

//-------------select event------------------

selector.addEventListener("change", function () {
  if (selector.value === "none") {
    container.innerHTML = "";
    makePageForEpisodes(allEpisodes);
    displayNum.innerText = "";
  } else {
    console.log(selector.value);
    const selectedEpisode = allEpisodes.filter((episode) => {
      return (
        `S${episode.season
          .toString()
          .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
          episode.name
        }` === selector.value
      );
    });
    container.innerHTML = "";
    makePageForEpisodes(selectedEpisode);
    displayNum.innerText = "";
    console.log(selectedEpisode);
  }
});

window.onload = setup;

// ***********Trying Ahmad's suggestion ************

// searchBox.addEventListener("input", function () {
//   const searchBoxValue = searchBox.value.toLowerCase();
//   const displayNum = document.getElementById("numOfDisplay");
//   const cardList = document.querySelectorAll(".card");
//   let newList = Array.from(cardList);

//   const filteredList = newList.filter(function (card) {
//     return card.innerText.toLowerCase().indexOf(searchBoxValue) > -1;
//   });

//   makePageForEpisodes(filteredList);
//   displayNum.innerText = ` Displaying ${filteredList.length}/${allEpisodes.length} episodes`;
// });
