import React from 'react';
import './Select.css'

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let select = event.target;
    let selectedOptions = select.options[select.selectedIndex];
    let selectedId = selectedOptions.getAttribute('id');

    this.props.onSelectChange(selectedId);
  }
    render () {
        return (
             <select value={this.props.value} onChange={this.handleChange} >
                {this.props.options.map((breed) =>
                    <option id={breed["id"]} key={breed["id"]}>{breed.name}</option>
                )}
             </select>
        );
    }
}

export default Select;
