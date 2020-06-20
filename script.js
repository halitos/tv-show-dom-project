//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

const main = document.getElementById("root");
const episodeCard = document.querySelector(".card");
const episodeTitle = document.getElementById("title");
const episodeImg = document.getElementById("image");
const episodeSum = document.getElementById("summary");
const seasonNum = document.getElementById("seriNum");
const episodeNum = document.getElementById("epNum");

// function makePageForEpisodes(episodeList) {
//   episodeTitle.textContent = `${episodeList[0].name}`;
//   seasonNum.textContent = `${episodeList[0].season}`;
//   episodeNum.textContent = `${episodeList[0].number}`;
//   episodeImg.setAttribute("src", `${episodeList[0].image.medium}`);
//   episodeSum.textContent = `${episodeList[0].summary}`;
// }

function makePageForEpisodes(episodeList) {
  episodeList.forEach(function (episode) {
    episodeTitle.textContent = episode.name;
    seasonNum.textContent = episode.season;
    episodeNum.textContent = episode.number;
    episodeImg.setAttribute("src", episode.image.medium);
    episodeSum.textContent = episode.summary;
  });
}

// function createNewList(episodeList) {
//   return episodeList
//     .map(function (item) {
//       return `<div class="episode">
//     <h1 class="episodeHeader">${
//       item.name
//     } - S${item.season.toString().padStart(2, "0")}E${item.number.toString().padStart(2, "0")}</h1>
//     <img src=${item.image.medium} alt= ${item.name}>
//     ${item.summary}
//     </div>`;
//     })
//     .join("");
// }

window.onload = setup;
