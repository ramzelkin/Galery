"use strict"

let images = [];
let selectedImageIndex = 0;

function getListOfBread() {
    let url = 'https://api.thecatapi.com/v1/breeds?attach_breed=0';
    let promise = fetch(url)
        .then(response => response.json())
        .then(breeds => setBreeds(breeds));
}

function setBreeds(breeds) {
    for (let i = 0; i < breeds.length; i += 1) {
        document.getElementById('breeds').innerHTML += `<option id="${breeds[i]["id"]}">${breeds[i]["name"]}</option>`;
    }
}

function initEvent() {
    document.getElementById('breeds').addEventListener("change", () => getSelectedBreed());
}

function getSelectedBreed() {
    let select = document.getElementById('breeds');
    let selectedOptions = select.options[select.selectedIndex];
    let id = selectedOptions.getAttribute('id');
    getSelectedBreedImages(id);
}

function getSelectedBreedImages(id) {
    let url= 'https://api.thecatapi.com/v1/images/search?limit=10&breed_id='+ id;
    let promise = fetch(url)
        .then(response => response.json())
        .then(newImages => {
            images = newImages;
            selectImageAtIndex(0)
        });
}

function selectImageAtIndex(index) {
    let image = document.getElementById('image');
    selectedImageIndex = index;
    image.setAttribute('src', "");
    image.setAttribute('src', `${images[index]["url"]}`);
}

function initPrevNextEvent() {
    document.getElementById('left').addEventListener('click', () => {
        if (selectedImageIndex > 0) {
            selectImageAtIndex(selectedImageIndex - 1);
        }
    });
    document.getElementById('right').addEventListener('click', () => {
        if (selectedImageIndex < images.length) {
            selectImageAtIndex(selectedImageIndex + 1);
        }
    });
}

getListOfBread();
initEvent();
initPrevNextEvent();
