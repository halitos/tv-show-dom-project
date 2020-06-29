//---------------global variables-----------------

const main = document.getElementById("root");
const selector = document.getElementById("episode-selector");
const searchBox = document.querySelector(".search-episodes");
const displayNum = document.getElementById("numOfDisplay");
const url1 = "https://api.tvmaze.com/shows/82/episodes";
const url2 = "https://api.tvmaze.com/shows/527/episodes";

const container = document.createElement("div");
container.id = "cardContainer";
let allEpisodes;
const allShows = getAllShows();

//-------sort shows in  alphabetical order------------

allShows.sort((a, b) => {
  let nameA = a.name.toLowerCase();
  let nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

//-------------setup function with fetch------------

function setup() {
  fetch(url2)
    .then((response) => response.json())

    .then((response) => (allEpisodes = response))

    .then((response) => {
      makePageForEpisodes(response);
      console.log(response);
    })

    .catch((error) => console.log(error));
}

//---------Make page & populate episode cards---------

function makePageForEpisodes(episodeList) {
  container.innerHTML = "";
  makeSelector();
  makeShowSelector();
  displayNum.innerText = ` Displaying ${episodeList.length}/${allEpisodes.length} episodes`;

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

    episodeNum.textContent = formatEpisodeNum(episode.season, episode.number);
    episodeTitle.textContent = episode.name;
    episodeImg.setAttribute("src", episode.image.medium);
    episodeSum.textContent = episode.summary.replace(/<[^>]*>/g, " ");
    episodeCard.id = "card" + index;
    container.appendChild(episodeCard);
    main.appendChild(container);
  });
}

//-----------Episode Num Formatter--------------

formatEpisodeNum = function (season, episode) {
  return `S${season.toString().padStart(2, "0")}E${episode
    .toString()
    .padStart(2, "0")}`;
};

//---------------Search event---------------

searchBox.addEventListener("input", searchForInput);

function searchForInput(event) {
  const searchBoxValue = event.target.value.toLowerCase();
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
}

//------------create show select options------------

function makeShowSelector() {
  allShows.forEach((episode) => {
    const optionValue = `<option>${episode.name}</option>`;
    showSelector.innerHTML += optionValue;
  });
}

//-------------Episode select event------------------

// const showSelector = document.getElementById("showSelector");

// showSelector.addEventListener("change", function (event) {
//   const showId = event.target.value;
//   fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((res) => {
//       makePageForEpisodes(res);
//     });
// });

//---------Create Episode Select Options--------------

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

//-------------Episode select event------------------

selector.addEventListener("change", selectFromMenu);

function selectFromMenu(event) {
  if (event.target.value === "none") {
    container.innerHTML = "";
    makePageForEpisodes(allEpisodes);
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
}

window.onload = setup;
