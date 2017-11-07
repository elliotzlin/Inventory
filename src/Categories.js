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
      this.setState({ input: '' });
      this.props.addCategory(this.state.input);
    }
  }

  onInput = (e) => {
    this.setState({ input: e.target.value })
  }

  onClickCat = (i) => {
    console.log(i)
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
          if (one.selected === true) {
            var oneCat = "selected one-cat-addition";
          } else {
            oneCat = "one-cat-addition";
          }
          return (
            <div className="one-cat" key={i}>
              <span className="one-cat-label">
                {one.item}
              </span>
              <span
                className={oneCat}
                role="button"
              >&#x2714;</span>
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default Categories;
