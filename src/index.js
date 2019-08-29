console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

let filter = ''

// TODO Challenge 1: on page load, fetch images, parse response as JSON, add each img to the dom
const handleFetchImages = () => {
  fetch(imgUrl)
    .then(res => res.json())
    .then(data => handleRenderImages(data))
}

const handleRenderImages = (data) => {
  const imgContainer = document.getElementById('dog-image-container')

  data.message.forEach(img => {
    const imgElement = document.createElement('img')
    imgElement.src = img
    imgElement.style = "width: 25%;"
    imgContainer.append(imgElement)
  })
}

// TODO Challenge 2: on page load, fetch all dog breeds, add breeds to dom in <ul>
const handleFetchBreeds = (filter = '') => {
  fetch(breedUrl)
    .then(res => res.json())
    .then(data => handleRenderBreeds(data, filter))
}

const handleRenderBreeds = (data, filter = '') => {
  const breedContainer = document.getElementById('dog-breeds')

  if (filter) {
    breedContainer.innerHTML = ""
  }

  for (breed in data.message) {

    // REVIEW this is repetitive
    if (filter && breed.startsWith(filter)) {
      li = document.createElement('li')
      li.innerText = breed

      li.addEventListener('click', (e) => {
        e.target.style = `color: firebrick`
      })

      breedContainer.append(li)
    } else if (!filter) {
      const li = document.createElement('li')
      li.innerText = breed

      li.addEventListener('click', (e) => {
        e.target.style = `color: firebrick`
      })

      breedContainer.append(li)
    }

  }
}

// TODO Challenge 3: once all breeds are rendered, change font color of particular <li> on click. any color.

// TODO Challenge 4: once all breeds load, allow user to filter breeds alphabetically. if user selects the letter a, only show dogs with names that start with a

document.addEventListener('DOMContentLoaded', function () {
  handleFetchImages()
  handleFetchBreeds()

  document.getElementById('breed-dropdown').addEventListener('change', (e) => {
    filter = e.target.value
    handleFetchBreeds(filter)
  })
})