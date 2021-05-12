import React from 'react';
import './ImageContainer.css';

class ImageContainer extends React.Component {
    constructor(props) {
        super(props);
  }

    render () {
        return (
            <div className="image-container">
                <img src={this.props.src} />
            </div>
        );
    }
}

export default ImageContainer;
