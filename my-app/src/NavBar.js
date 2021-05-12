import React from 'react';
import './NavBar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    let list = event.target;
    let selectedItem = list.getAttribute('data-id');

    this.props.onClick(selectedItem);
  }

    render () {
        let items = [];
        for (let i = 0; i < this.props.count; i += 1) {
            items.push(<li key={i} data-id={i}></li>)
        }
        return (
             <ul className="nav" onClick={this.handleClick}>
                {items}
             </ul>
        );
    }
}

export default NavBar;
