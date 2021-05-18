import React from 'react';

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
                {this.props.options}
             </select>
        );
    }
}

export default Select;
