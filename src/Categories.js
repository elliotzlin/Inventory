import React from 'react';
import './style/Categories.css';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.input !== '') {
      const newItem = {
        id: this.state.input.toString(),
        x: false,
        checkMark: false,
        item: this.state.input,
      }
      this.setState({ input: '' });
      this.props.addCategory(newItem);
    }
  }

  onInput = (e) => {
    this.setState({ input: e.target.value })
  }

  onClickX = (id) => {
    let updatedCat = this.props.categories.map((cat) => {
      if (cat.id === id) {
        return {
          ...cat,
          x: !cat.x,
        }
      }
      return cat;
    });
    this.props.updateCat(updatedCat);
  }

  onClickCheck = (id) => {
    let updatedCat = this.props.categories.map((cat) => {
      if (cat.id === id) {
        return {
          ...cat,
          checkMark: !cat.checkMark,
        }
      }
      return cat;
    });
    this.props.updateCat(updatedCat);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.input}
            onChange={this.onInput}
            className="input-categories"
            placeholder="Add a new category"
            type="text"
          />
          <button onClick={this.onSubmit} className="btn button-add">+</button>
        </form>
        {this.props.categories.map((one, i) => {
          let xSelected = "none-selected";
          let checkSelected = "none-selected";
          if (one.x === true) {
            xSelected = "x-selected";
          }
          if (one.checkMark === true) {
            checkSelected = "check-selected";
          }
          return (
            <div className="one-cat" key={one.item.toString()}>
              <span className="one-cat-label">
                {one.item}
              </span>
              <span className="cat-icons">
                <span
                  onClick={() => this.onClickCheck(one.id)}
                  className={checkSelected}
                  role="button"
                >&#x2714;</span>
                <span
                  onClick={() => this.onClickX(one.id)}
                  className={xSelected}
                  role="button"
                ><strong>X</strong></span>
              </span>
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default Categories;
