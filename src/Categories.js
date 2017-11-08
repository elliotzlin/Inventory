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
    const newId = this.state.input.toString();
    let isNew = true;
    let categories = this.props.categories;
    for (var i=0; i<categories.length; i++) {
      if (newId === categories[i].id) isNew = false;
    }
    if (this.state.input !== '' && isNew) {
      const newItem = {
        id: newId,
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

  onClickCheck = (id, field) => {
    console.log('in click')
    let updatedCat = this.props.categories.map((cat) => {
      if (cat.id === id) {
        if (field === 'x') {
          return {
            ...cat,
            x: !cat.x,
          }
        } else {
          return {
            ...cat,
            checkMark: !cat.checkMark,
          }
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
                <span className="check-wrapper"><a
                  onClick={() => this.onClickCheck(one.id, 'check')}
                  className={checkSelected}
                  role="button"
                                                >&#x2714;</a></span>
                <span className="x-wrapper"><a
                  onClick={() => this.onClickCheck(one.id, 'x')}
                  className={xSelected}
                  role="button"
                ><strong>X</strong></a></span>
              </span>
            </div>
          )
        }
        )}
        <div className="utils">HAHAHHA</div>
      </div>
    )
  }
}

export default Categories;
