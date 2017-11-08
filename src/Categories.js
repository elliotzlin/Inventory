import React from 'react';
import './style/Categories.css';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isDel: false,
      isMerge: false,
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
        label: this.state.input,
        items: [],
      }
      this.setState({ input: '' });
      this.props.addCategory(newItem);
    }
  }

  onInput = (e) => {
    this.setState({ input: e.target.value })
  }

  onClickCheck = (id, field) => {
    let isX = false;
    let isCheck = false;
    let updatedCat = this.props.categories.map((cat) => {
      if (cat.id === id) {
        if (field === 'x') {
          if (cat.x === false) isX = true;
          if (cat.checkMark === true) isCheck = true;
          return {
            ...cat,
            x: !cat.x,
          }
        } else {
          if (cat.x === true) isX = true;
          if (cat.checkMark === false) isCheck = true;
          return {
            ...cat,
            checkMark: !cat.checkMark,
          }
        }
      }
      if (cat.x === true) isX = true;
      if (cat.checkMark === true) isCheck = true;
      return cat;
    });
    if (isX) {
      this.props.updateUtilsBtn(true, null);
    } else {
      this.props.updateUtilsBtn(false, null);
    }
    if (isCheck) {
      this.props.updateUtilsBtn(null, true);
    } else {
      this.props.updateUtilsBtn(null, false);
    }
    this.props.updateCat(updatedCat);
  }

  render() {
    let mergeBtn = (!this.props.isMerge) ? <button className="btn btn-non-click">+ Merge</button> : <button className="btn btn-merge">+ Merge</button>
    let delBtn = (!this.props.isDel) ? <button className="btn btn-non-click"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button> : <button className="btn btn-delete"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
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
            <div className="one-cat" key={one.label.toString()}>
              <span className="one-cat-label">
                {one.label}
              </span>
              <span className="cat-icons">
                <a role="button" style={{ 'color': 'black' }}><i className="fa fa-pencil" aria-hidden="true"></i></a>
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
        <div className="utils">
          {mergeBtn}
          {delBtn}
        </div>
      </div>
    )
  }
}

export default Categories;
