import React from 'react';

const Row = (props) => {
  const { oneRow, i } = props;
  return (
    <div className="row-entry">
      <span>{oneRow}</span>
      <a
        role="button"
        onClick={() => props.callEditReceiptModal(oneRow, i)}
        style={{ float: "right" }}
      ><i className="fa fa-pencil" aria-hidden="true"/>
      </a>
    </div>
  )
}

export default Row;
