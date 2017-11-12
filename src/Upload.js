import React from 'react';
import './style/Upload.css'

const Upload = (props) => {
  let imageViewer = props.imageViewer;
  let $imageViewer = null;
  if (imageViewer) {
    $imageViewer = (<img className="img-upload" alt="receipt" src={imageViewer} />);
  } else {
    $imageViewer = (<div className="preview-text">Upload Receipt</div>);
  }
  return (
    <div>
      <div className="img-preview" alt="receipt">
        {$imageViewer}
      </div>
    </div>
  )
}

export default Upload;
