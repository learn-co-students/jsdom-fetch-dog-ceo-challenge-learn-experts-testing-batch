console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function fetchImages() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => renderImages(json));
}

function renderImages(json) {
    const dogImageContainer = document.getElementById('dog-image-container');
    json.message.forEach(image => {

        const img = document.createElement('img');
        img.src = image;
        img.style = "width: 25%;"
        dogImageContainer.appendChild(img);
    })
}

function fetchBreeds(filter = '') {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => renderBreeds(json, filter));
}

function renderBreeds(json, filter = '') {
    const dogBreedContainer = document.getElementById('dog-breeds');

    for (breed in json.message) {
        const li = document.createElement('li');
        li.innerText = breed;
        li.className = 'breed';
        li.style.cursor='pointer'; //EXTRA
        li.addEventListener('click', function(event) {
            event.target.style = "color: red;"
        })
        
        if (filter) {
            if (filter === breed[0]) {
                dogBreedContainer.appendChild(li);
            }
        } else {
            dogBreedContainer.appendChild(li);
        }
    }
    //EXTRA
    if (dogBreedContainer.querySelectorAll('li').length === 0) {
        window.alert(`There are no breed names beginning with ${filter}`)
    }
    //END OF EXTRA//
    //EXTRA
    if (filter) {
        if (!document.getElementById('clear-filter')) {
            const clearFilter = document.createElement('button');
            clearFilter.innerText = "Clear Filter"
            clearFilter.id = "clear-filter";
            clearFilter.addEventListener('click', function() {
                const dogBreedContainer = document.getElementById('dog-breeds');
                while (dogBreedContainer.firstChild) {
                    dogBreedContainer.removeChild(dogBreedContainer.firstChild);
                }
                clearFilter.remove();
                document.getElementById('breed-dropdown').value = '';
                fetchBreeds();
            })
            document.body.appendChild(clearFilter);    
        }
    }
    //END OF EXTRA
}

document.addEventListener('DOMContentLoaded', function() {
    fetchImages();
    fetchBreeds();
    //EXTRA
    const select = document.getElementById('breed-dropdown');
    const restOfAlphabet = ['e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    restOfAlphabet.forEach(letter => {
        const option = document.createElement('option');
        option.value = letter;
        option.innerText = letter;
        select.appendChild(option);
    });
    //END OF EXTRA
    const dogBreedContainer = document.getElementById('dog-breeds');
    select.addEventListener('change', function() {
        while (dogBreedContainer.firstChild) {
            dogBreedContainer.removeChild(dogBreedContainer.firstChild);
        }
        const selection = select.value;
        fetchBreeds(selection);
    })
})