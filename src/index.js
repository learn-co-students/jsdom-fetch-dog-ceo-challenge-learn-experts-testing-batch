let breedArray = []

window.onload = () => {
    getDogs()
    getBreeds()
    onBreedClick()
    onFilterClick()
}

function getDogs() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
  .then(function(response) {
    return response.json();
    })
  .then(function(json) {
    const dogArray = json.message;
    let imgContainer = document.getElementById("dog-image-container"); //can't be const b/c change below
    dogArray.forEach(function(dog){
      //for each loop to add to dom
      imgContainer.innerHTML += `<img src=${dog} />`
      //have to use innerHTML instead of innerText or else links it will show up as text, not imgs
    })
    });
}

function getBreeds() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(function(response) {
    return response.json();
    })
  .then(function(json) {
    let breeds = Object.keys(json.message); //returns an array of a given object's own enumerable property names
    breeds.forEach(function(breed) {
      breedArray.push(breed)
      //variable declared in global scope so have access in filter function
      //resetting value didn't work, but pushing did
    });
    displayBreeds()
    //was having an issue with how values stored
    //to array b/c of asynchronosity
    //the array looked right in functions that were called later like filterBreeds
    //but looked like object in function displayBreeds that was being loaded asynchronously
    //by calling it at end of function instead of onload it's not aysnchronous
    });

}

function displayBreeds() {
  //extracted this from getBreeds() so can access breeds in other functions w/o reloading html
  let listContainer = document.getElementById("dog-breeds");
  breedArray.forEach(function(breed){
    let newLi = document.createElement("LI");
    let text = document.createTextNode(breed); //w/o this get: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
    newLi.setAttribute("id", breed)
    newLi.appendChild(text);
    listContainer.appendChild(newLi)
  })
}

function onBreedClick() {
    let listContainer = document.getElementById("dog-breeds");
    listContainer.addEventListener('click', changeColor);
  }

  function changeColor(){
    event.target.style.color = "pink";

  }

  function onFilterClick() {
    let selectBreed = document.getElementById("breed-dropdown");
    selectBreed.addEventListener('change', filterBreeds); //for dropdowns use change over click

  }

  function filterBreeds() {
    let listContainer = document.getElementById("dog-breeds");
    listContainer.innerHTML = ""; //need to reset to empty to load from scratch
    breedArray.forEach(function(breed){
      if (breed.startsWith(event.target.value)) {
        let newLi = document.createElement("LI");
        let text = document.createTextNode(breed); //w/o this get: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
        newLi.setAttribute("id", breed)
        newLi.appendChild(text);
        listContainer.appendChild(newLi)
      }
    })
  }
