//-------------setup function------------

function setup() {
  fetch(url1)
    .then((response) => response.json())

    .then((response) => (allEpisodes = response))

    .then((response) => {
      makePageForEpisodes(response);
      console.log(response);
    })

    .catch((error) => console.log(error));
}

//---------------global variables-----------------

const main = document.getElementById("root");
const selector = document.getElementById("episode-selector");
const searchBox = document.querySelector(".search-episodes");
const url1 = "https://api.tvmaze.com/shows/82/episodes";
const url2 = "https://api.tvmaze.com/shows/527/episodes";
let container;
let displayNum;
let allEpisodes;

//---------load page with episode cards---------

function makePageForEpisodes(episodeList) {
  container = document.createElement("div");
  container.id = "cardContainer";
  makeSelector();

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
    episodeImg.id = "image" + index;
    episodeCard.appendChild(episodeImg);

    const episodeSum = document.createElement("p");
    episodeSum.id = "summary";
    episodeCard.appendChild(episodeSum);

    episodeNum.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    episodeTitle.textContent = episode.name;
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

function makeSelector() {
  allEpisodes.forEach((episode) => {
    const option = `<option>S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    } </option>`;
    selector.innerHTML += option;
  });
}

//-------------select event------------------

selector.addEventListener("change", function () {
  if (selector.value === "none") {
    container.innerHTML = "";
    makePageForEpisodes(allEpisodes);
    displayNum.innerText = "";
  } else {
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
  }
  selector.value = "";
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

// searchBox.addEventListener("input", function () {
//   const searchBoxValue = searchBox.value.toLowerCase();
//   displayNum = document.getElementById("numOfDisplay");

//   let filteredList = allEpisodes.filter(function (episode) {
//     episode.innerText.toLowerCase().indexOf(searchBoxValue) > -1;
//   });
//   makePageForEpisodes(filteredList);
//   displayNum.innerText = ` Displaying ${filteredList.length}/${allEpisodes.length} episodes`;
// });
