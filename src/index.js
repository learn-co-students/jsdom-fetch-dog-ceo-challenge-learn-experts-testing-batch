var breedList = []

window.onload = () => {
    fetchImages()
    fetchBreeds()
    document.getElementById("breed-dropdown").addEventListener("change", handleBreedSelection)
}

const fetchImages = () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

    fetch(imgUrl).then(response => {
        return response.json()
    }).then(json => {
        let container = document.getElementById("dog-image-container")
        json.message.forEach( image => {
            container.innerHTML += `<img src=${image} /> <br/>`
        })
    })
}

const fetchBreeds = () => {
    const imgUrl = "https://dog.ceo/api/breeds/list/all"

    fetch(imgUrl).then(response => {
        return response.json()
    }).then(json => {
        let container = document.getElementById("dog-breeds")
        Object.keys(json.message).forEach( breed => {
            breedList.push(breed)
            container.innerHTML += `<li onClick=handleColorChange(event)>${breed}</li>`
        })
    })
}

const handleColorChange = e => {
    e.target.style.color = "blue";
}

const handleBreedSelection = e => {
    let container = document.getElementById("dog-breeds")
    container.innerHTML = ""

    breedList.forEach( breed => {
       if (e.target.value == "") {
              container.innerHTML += `<li onClick=handleColorChange(event)>${breed}</li>`
        } else {
           if (breed[0].includes(e.target.value)) {
                container.innerHTML += `<li onClick=handleColorChange(event)>${breed}</li>`
           }
       }
    })
}

//Time to complete: 45 min