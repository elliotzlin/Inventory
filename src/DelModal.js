import React from 'react';
import './style/Modal.css';

const DelModal = (props) => (
  <div>
    <div className="modal-label">
      <h4>Delete</h4>
      <br />
      Are you sure you want to delete these categories?
    </div>
    <div className="modal-btn">
      <button onClick={props.delModalNo} className="btn cancel-btn">Cancel</button>
      <button onClick={props.delModalYes} className="btn del-btn">Delete</button>
    </div>
  </div>
);

export default DelModal;
