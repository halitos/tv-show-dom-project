//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

const main = document.getElementById("root");

const episodeCard = document.createElement("div");
episodeCard.id = "card"; // will be the last thing

const cardHead = document.createElement("div");
cardHead.id = "cardHeader";
episodeCard.appendChild(cardHead);

const episodeTitle = document.createElement("h3");
episodeTitle.id = "name";
cardHead.appendChild(episodeTitle);

const seasonNum = document.createElement("h6");
seasonNum.id = "seriNum";
cardHead.appendChild(seasonNum);

const episodeImg = document.createElement("img");
episodeImg.id = "image";
episodeCard.appendChild(episodeImg);

const episodeSum = document.createElement("p");
episodeSum.id = "summary";
episodeCard.appendChild(episodeSum);

function makePageForEpisodes(episodeList) {
  episodeList.map(function (episode) {
    episodeTitle.textContent = episode.name;
    seasonNum.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}  E${episode.number.toString().padStart(2, "0")}`;
    episodeImg.setAttribute("src", episode.image.medium);
    episodeSum.textContent = episode.summary;
    main.appendChild(episodeCard);
  });
}

window.onload = setup;
