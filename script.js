//---------------globals-----------------

const allEpisodes = getAllEpisodes();
const main = document.getElementById("root");

//-------------setup function------------

function setup() {
  makePageForEpisodes(allEpisodes);
}

//---------load page with episode cards---------

function makePageForEpisodes(episodeList) {
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
  displayNum.innerText = ` Displaying ${filteredList.length}/${allEpisodes.length} episodes`;
});

//---------------Select Menu------------------

const selector = document.getElementById("episode-selector");

allEpisodes.forEach((episode) => {
  const option = `<option>S${episode.season
    .toString()
    .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
    episode.name
  } </option>`;
  selector.innerHTML += option;
});

selector.addEventListener("change", function () {
  if (selector.value !== "none") {
    const selectedEpisodes = allEpisodes.filter((episode) => {
      const result = `S0${episode.season}E0${episode.number} - ${episode.name}`;
      return result === selector.value;
    });
    makePageForEpisodes(selectedEpisodes);
    console.log(selectedEpisodes);
  } else {
    makePageForEpisodes(allEpisodes);
  }
});

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

// Ahmad's suggestion ****************

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
