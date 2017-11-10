import React from 'react';
import './style/Modal.css';

class MergeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      duplicate: false,
    }
  }

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      label: e.target.value,
    });
  }

  onSubmitChange = () => {
    let isNew = true;
    let categories = this.props.categories;
    for (let i=0; i<categories.length; i++) {
      if (this.state.label === categories[i].id && categories[i].checkMark === false) {
        isNew = false;
        break;
      }
    }
    if (isNew && this.state.label !== '') {
      this.props.mergeModalYes(this.state.label);
      this.props.callMergeModal();
    } else {
      this.setState({ duplicate: true });
    }
  }

  render() {
    return (
      <div>
        <div className="modal-label">
          <h4>Name your new Category</h4>
          <br />
          Old categories will be deleted.
          <input
            className="edit-input"
            value={this.state.label}
            onChange={(e) => this.onChangeHandler(e)}
          />
          {this.state.duplicate &&
            <span style={{ color: '#fc4a1a' }}><small>Name already existed or blank entry!</small></span>
          }
        </div>
        <div className="modal-btn">
          <button onClick={this.props.callMergeModal} className="btn cancel-btn">Cancel</button>
          <button onClick={this.onSubmitChange} className="btn del-btn">Submit</button>
        </div>
      </div>
    )
  }
}

export default MergeModal;
