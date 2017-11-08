import React from 'react';
import './style/Modal.css';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      duplicate: false,
    }
  }

  componentDidMount() {
    this.setState({
      label: this.props.cat.label,
    });
  }

  onChangeHandler = (e) => {
    this.setState({
      duplicate: false,
      label: e.target.value,
    });
  }

  onSubmitChange = () => {
    let categories = this.props.categories;
    let canChange = true;
    for (let i=0; i<categories.length; i++) {
      if (this.state.label === categories[i].id) {
        canChange = false;
        break;
      }
    }
    if (canChange) {
      categories = categories.map((cat) => {
        if (cat.id === this.props.cat.id) {
          return {
            ...cat,
            id: this.state.label.toString(),
            label: this.state.label,
          }
        };
        return cat;
      });
      this.props.editCatName();
      this.props.submitNewCatName(categories);
    } else {
      this.setState({ duplicate: true });
    }
  }

  render() {
    return (
      <div>
        <div className="modal-label">
          <h4>Edit Name</h4>
          <br />
          <input
            className="edit-input"
            value={this.state.label}
            onChange={(e) => this.onChangeHandler(e)}
          />
          {this.state.duplicate ? (
            <span style={{ color: '#fc4a1a' }}><small>No Duplicate Allowed!</small></span>
          ) : null}
        </div>
        <div className="modal-btn">
          <button onClick={this.props.editCatName} className="btn cancel-btn">Cancel</button>
          <button onClick={this.onSubmitChange} className="btn del-btn">Submit</button>
        </div>
      </div>
    )
  }
}

export default EditModal;
