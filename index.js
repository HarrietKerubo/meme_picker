import { catsData } from "./data.js";
const emotionRadios = document.getElementById("emotion-radios");
const imageBtn = document.querySelector("#get-image-btn");
const gifsOnlyCheckBox = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");

imageBtn.addEventListener("click", renderCat);
emotionRadios.addEventListener("change", highlightCheckedOption);

// Change radio accent color, text and radio div color when a certain mood is selected

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");

  for (let radio of radios) {
    radio.classList.remove("highlight");
  }

  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}
// Get an array of cat objects that meets user's emotion criteria
function getMatchingCatsArray() {
  if (document.querySelector("input[type=radio]:checked")) {
    const selectedEmotion = document.querySelector(
      "input[type=radio]:checked"
    ).value;

    const isGif = gifsOnlyCheckBox.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

// return a single cat object selected form the array provided by getMatchingCatsArray
function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  // check if catsArray only has one object and return it  , else, select an object at random then return it
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
}

// use cat object selected by getSingleCatObject to create HTML string which it will render to the dom
function renderCat() {
  const catObject = getSingleCatObject();

  const catImage = catObject.image;

  memeModalInner.innerHTML = `<img 
      class="cat-img" 
      src="./images/${catImage}"
      alt="CAT ALT TEXT"
      >`;

  memeModal.style.display = "flex";
}

//put all emotions in an array
function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

// render all emotions on the browser

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);
  for (let emotion of emotions) {
    radioItems += `<div class="radio">
    <label for="${emotion}"> ${emotion}</label>
    <input 
    type="radio"
    id ="${emotion}"
    value = "${emotion}"
    name = "choice-radio"
    >
    </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
