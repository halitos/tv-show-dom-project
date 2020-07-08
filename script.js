//---------------global variables-----------------

const main = document.getElementById("root");
const episodeSelector = document.getElementById("episode-selector");
const searchBox = document.querySelector(".search-episodes");
const displayNum = document.getElementById("numOfDisplay");
const container = document.createElement("div");
container.id = "cardContainer";
const allShows = getAllShows();
let selectedShow;
let showClickLinks;

//-------sort shows in alphabetical order------------

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

// allShows.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

//-------------setup function with fetch------------
function setup() {
  makePageForShows(allShows);
  makeShowSelector();
}

//------------create show select function------------

function makeShowSelector() {
  allShows.forEach((show) => {
    const optionValue = `<option value="${show.id}">${show.name}</option>`;
    showSelector.innerHTML += optionValue;
  });
}

//-------------Fetch and display selected show's episodes------------------

const showSelector = document.getElementById("showSelector");

showSelector.addEventListener("change", function (event) {
  episodeSelector.innerHTML = "";
  const showId = event.target.value;
  if (showId == "none") {
    setup();
  } else {
    fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        makePageForEpisodes(response);
        makeEpisodeSelector(response);
      })
      .catch((error) => console.log(error));
  }
});

//---------select show by click--------------

function clickShow() {
  episodeSelector.innerHTML = "";
  let showId = event.target.id;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      makePageForEpisodes(response);
      makeEpisodeSelector(response);
    })
    .catch((error) => console.log(error));
  showSelector.value = showId;
}

//---------Make page & populate shows/episodes---------

const emptyImage =
  "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";

function makePageForShows(showList) {
  container.innerHTML = "";
  episodeSelector.style.display = "none";
  displayNum.innerText = ` Displaying ${showList.length} shows`;

  let showTitle;

  showList.forEach(function (show, index) {
    const showCard = document.createElement("div");
    showCard.className = "card";

    const cardHead = document.createElement("div");
    cardHead.className = "cardHeader";
    showCard.appendChild(cardHead);

    showTitle = document.createElement("h3");
    const showLink = document.createElement("a");
    showLink.id = show.id;
    showLink.href = "#";
    showLink.className = "show-link";
    showTitle.appendChild(showLink);

    cardHead.appendChild(showTitle);

    const showImg = document.createElement("img");
    showCard.appendChild(showImg);

    const showExtraInfo = document.createElement("div");
    showExtraInfo.className = "extraInfoBox";
    showExtraInfo.innerHTML = `<p><strong> Genres:</strong> ${show.genres}</p>
    <p><strong>Status:</strong> ${show.status}</p>
    <p><strong>Rating:</strong> ${show.rating.average}</p>
    <p><strong>Runtime:</strong> ${show.runtime}</p>`;
    showCard.appendChild(showExtraInfo);

    const showSum = document.createElement("p");
    showSum.id = "summary";
    showSum.innerHTML = `<h4>Summary</h4>${show.summary}`;
    showCard.appendChild(showSum);

    showLink.textContent = show.name;
    showImg.setAttribute("src", show.image ? show.image.medium : emptyImage);

    container.appendChild(showCard);
    main.appendChild(container);
  });
  showClickLinks = document.querySelectorAll(".show-link");
  showClickLinks.forEach((link) => link.addEventListener("click", clickShow));
}

function makePageForEpisodes(episodeList) {
  container.innerHTML = "";
  searchBox.value = "";
  displayNum.innerText = ` Displaying ${episodeList.length} episodes`;

  episodeList.forEach(function (episode, index) {
    const episodeCard = document.createElement("div");
    episodeCard.className = "card";

    const cardHead = document.createElement("div");
    cardHead.className = "cardHeader";
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
    episodeImg.setAttribute(
      "src",
      episode.image ? episode.image.medium : emptyImage
    );

    episodeSum.innerHTML = episode.summary;
    container.appendChild(episodeCard);
    main.appendChild(container);
  });
}

//-----------Episode Num Formatter--------------

function formatEpisodeNum(season, episode) {
  return `S${season.toString().padStart(2, "0")}E${episode
    .toString()
    .padStart(2, "0")}`;
}

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
  displayNum.innerText = ` Displaying ${filteredList.length} items`;
}

//---------Create Episode Select Options--------------

function makeEpisodeSelector(episodeList) {
  selectedShow = episodeList;
  episodeSelector.innerHTML = "";
  episodeSelector.style.display = "";
  episodeSelector.innerHTML =
    '<option value="none">All episodes</option></select>';
  episodeList.forEach((episode) => {
    const option = `<option>S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    } </option>`;
    episodeSelector.innerHTML += option;
  });
}

//-------------Episode select event------------------

episodeSelector.addEventListener("change", selectFromMenu);

function selectFromMenu(event) {
  if (event.target.value === "none") {
    container.innerHTML = "";
    searchBox.value = "";
    makePageForEpisodes(selectedShow);
  } else {
    const selectedEpisode = selectedShow.filter((episode) => {
      return (
        `S${episode.season
          .toString()
          .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
          episode.name
        }` === episodeSelector.value
      );
    });
    searchBox.value = "";
    makePageForEpisodes(selectedEpisode);
  }
}

window.onload = setup;
