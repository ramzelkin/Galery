import React from 'react';
import './MainContainer.css'
import SelectBreed from './SelectBreed.js';
import ImageContainer from './ImageContainer.js';
import NavBar from './NavBar.js';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSelectListItem = this.handleSelectListItem.bind(this);
        this.state = {
            selectedBreedId: '',
            breeds: [],
            imageSrc: '',
            images: []
        };
    }

    componentDidMount() {
        this.getListOfBread();
    }

    getListOfBread() {
       let url = 'https://api.thecatapi.com/v1/breeds?attach_breed=0';
       let promise = fetch(url)
           .then(response => response.json())
           .then(breeds => {
               this.setBreeds(breeds);
               this.getSelectedBreedImages(breeds[0]['id']);
           });
   }

   setBreeds(breeds) {
       let state = this.state;

       state.breeds = breeds;
       this.setState(state);
  }

    handleSelectChange(id) {
        let state = this.state;

        state.selectedBreedId = id;
        state.imageSrc = "";
        state.images = [];
        this.setState(state);
        this.getSelectedBreedImages(id);
    }

    handleSelectListItem(index) {
        let state = this.state;

        state.imageSrc = '';
        this.setState(state);
        setTimeout(() => {
            state.imageSrc = state.images[index].url;
            this.setState(state);
        }, 0);    
    }

    getSelectedBreed() {
        let selectedBreed = this.state.breeds.filter(breed => breed.id === this.state.selectedBreedId)[0];
        if (selectedBreed === undefined) return {};
        return selectedBreed;
    }

    getSelectedBreedImages(id) {
       let url= 'https://api.thecatapi.com/v1/images/search?limit=10&breed_id='+ id;
       let promise = fetch(url)
           .then(response => response.json())
           .then(newImages => {
               let state = this.state;

               state.images = newImages;
               state.imageSrc = newImages[0].url;
               this.setState(state);
           });
   }

    render () {
        return (
            <div className="main-container">
                <SelectBreed
                    value={this.getSelectedBreed().name}
                    options={this.state.breeds.map((breed) =>
                        <option id={breed["id"]} key={breed["id"]}>{breed.name}</option>
                    )}
                    onSelectChange={this.handleSelectChange}
                />
                <ImageContainer src={this.state.imageSrc}/>
                <NavBar
                    count={this.state.images.length}
                    onClick={this.handleSelectListItem}
                />
            </div>
        );
    }
}

export default MainContainer;
