"use strict"

class Galery {
  constructor() {
      this.images = [];
      this.selectedImageIndex = 0;
   }

    getListOfBread() {
       let url = 'https://api.thecatapi.com/v1/breeds?attach_breed=0';
       let promise = fetch(url)
           .then(response => response.json())
           .then(breeds => this.setBreeds(breeds));
   }

    setBreeds(breeds) {
       for (let i = 0; i < breeds.length; i += 1) {
           document.getElementById('breeds').innerHTML += `<option id="${breeds[i]["id"]}">${breeds[i]["name"]}</option>`;
       }
   }

    initEvent() {
       document.getElementById('breeds').addEventListener("change", () => this.getSelectedBreed());
   }

    getSelectedBreed() {
       let select = document.getElementById('breeds');
       let selectedOptions = select.options[select.selectedIndex];
       let id = selectedOptions.getAttribute('id');
       this.getSelectedBreedImages(id);
   }

    getSelectedBreedImages(id) {
       let url= 'https://api.thecatapi.com/v1/images/search?limit=10&breed_id='+ id;
       let promise = fetch(url)
           .then(response => response.json())
           .then(newImages => {
               this.images = newImages;
               this.selectImageAtIndex(0)
           });
   }

    selectImageAtIndex(index) {
       let image = document.getElementById('image');
       this.selectedImageIndex = index;
       image.setAttribute('src', "");
       image.setAttribute('src', `${this.images[index]["url"]}`);

       document.getElementById('nav').innerHTML = '';
       for (let i = 0; i < this.images.length; i += 1) {
           document.getElementById('nav').innerHTML += `<li data-index="${i}"></li>`;
       }
   }

    initPrevNextEvent() {
       document.getElementById('left').addEventListener('click', () => {
           if (this.selectedImageIndex > 0) {
               this.selectImageAtIndex(this.selectedImageIndex - 1);
           }
       });
       document.getElementById('right').addEventListener('click', () => {
           if (this.selectedImageIndex < this.images.length - 1) {
               this.selectImageAtIndex(this.selectedImageIndex + 1);
           }
       });
   }

    initNavEvent() {
       document.getElementById('nav').addEventListener('click', event => {
           let currentItem = event.target;
           let index = currentItem.getAttribute('data-index');
           this.selectImageAtIndex(index);
       });
   }
}

let galery = new Galery();
galery.getListOfBread();
galery.initEvent();
galery.initPrevNextEvent();
galery.initNavEvent();
