"use strict"

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
        .then(images => addImages(images));
}

function addImages(images) {
    console.log(images);
}

getListOfBread();
initEvent();
