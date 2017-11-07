import React from 'react';
import Row from './Row';

const InfoRow = (props) => (
  <div>
    {props.infoRow.map((oneRow) =>
      <Row oneRow={oneRow} />
    )}
  </div>
)

export default InfoRow;
