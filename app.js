const accessKey = "KAFk7lngzyncXbPuHnEQDjMHv5j5qqfezU3oHCheK3A";
const formEl = document.querySelector("form");
const searchEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let pageNumber = 1;
async function searchImages() {
  inputData = searchEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (pageNumber === 1) {
    searchResultEl.innerHTML = "";
  }

  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultEl.appendChild(imageWrapper);
  });

  pageNumber++;
  showMoreButton.textContent = "Show more";

  if (pageNumber > 1) {
    showMoreButton.style.display = "block";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  pageNumber = 1;
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});
