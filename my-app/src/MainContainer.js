import React from 'react';
import './MainContainer.css'
import SelectBreed from './SelectBreed.js';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {
            selectedBreedId: '',
            breeds: []
        };
    }

    componentDidMount() {
        this.getListOfBread();
    }

    getListOfBread() {
       let url = 'https://api.thecatapi.com/v1/breeds?attach_breed=0';
       let promise = fetch(url)
           .then(response => response.json())
           .then(breeds => this.setBreeds(breeds));
   }

   setBreeds(breeds) {
       let state = this.state;

       state.breeds = breeds;
       this.setState(state);
  }

    handleSelectChange(id) {
        let state = this.state;

        state.selectedBreedId = id;
        this.setState(state);

    }

    getSelectedBreed() {
        let selectedBreed = this.state.breeds.filter(breed => breed.id === this.state.selectedBreedId)[0];
        if (selectedBreed === undefined) return {};
        return selectedBreed;
    }

    render () {
        return (
            <SelectBreed
                value={this.getSelectedBreed().name}
                options={this.state.breeds.map((breed) =>
                    <option id={breed["id"]} key={breed["id"]}>{breed.name}</option>
                )}
                onSelectChange={this.handleSelectChange}
            />
        );
    }
}

export default MainContainer;
