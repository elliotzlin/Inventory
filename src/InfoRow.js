import React from 'react';
import Row from './Row';

const InfoRow = (props) => (
  <div>
    {props.infoRow.map((oneRow, i) =>
      <Row
        key={i}
        {...props}
        i={i}
        oneRow={oneRow} />
    )}
  </div>
)

export default InfoRow;
