import React from 'react';
import './MainContainer.css'
import Select from './Select.js';
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
            images: [],
            isLoading: false
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
       this.setState({
        breeds: breeds
      });
  }

    handleSelectChange(id) {
        this.setState({
         selectedBreedId: id
       });
        this.getSelectedBreedImages(id);
    }

    handleSelectListItem = (index) => {
        let state = this.state;

        this.setState({
            imageSrc: state.images[index].url
        });
    }

    getSelectedBreed() {
        let selectedBreed = this.state.breeds.filter(breed => breed.id === this.state.selectedBreedId)[0];
        if (selectedBreed === undefined) return {};
        return selectedBreed;
    }

    getSelectedBreedImages(id) {
        this.setState({ isLoading: true });
        let url= 'https://api.thecatapi.com/v1/images/search?limit=10&breed_id='+ id;
        let promise = fetch(url)
           .then(response => response.json())
           .then(newImages => {
               this.setState({
                images: newImages,
                imageSrc: newImages[0].url,
                isLoading: false
              });
           });
   }

    render () {
        if (this.state.isLoading) {
            return <div className="loader">Loading...</div>
        }
        else {
            return (
                <div className="main-container">
                    <Select
                        value={this.getSelectedBreed().name}
                        options={this.state.breeds}
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
}

export default MainContainer;
