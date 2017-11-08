import React from 'react';
import './style/Header.css';
import Categories from './Categories';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCat: false,
    }
  }

  onCategoriesClick = () => {
    let displayCat = !this.state.displayCat;
    this.setState({ displayCat });
  }

  render() {
    let displayCat = null;
    let catIcon = <a className="categories-icon">&#9776;</a>;
    if (this.state.displayCat === true) {
      displayCat = <Categories
        className="categories-label"
        updateCat={this.props.updateCat}
        addCategory={this.props.addCategory}
        categories={this.props.categories} />
      catIcon = <a className="categories-icon">X </a>
    }
    return (
      <div className="header">
        <button className="btn header-button file-container">
          Upload Receipt
          <input
            type="file"
            onChange={(e)=>this.props.imageChange(e)} />
        </button>
        <div>
          <button
            className="btn categories header-button"
            onClick={this.onCategoriesClick}
          >
            {catIcon} <span>Categories</span>
          </button>
          {displayCat}
        </div>
        <button className="btn header-button">
          Graphs
        </button>
        <button className="btn header-button">
          Login
        </button>
      </div>
    )
  }
}

export default Header;
