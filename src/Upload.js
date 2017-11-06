import React from 'react';
import axios from 'axios';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageViewer: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { imageViewer } = this.state;
    let myImage = imageViewer.slice(22, imageViewer.length);
    console.log(typeof myImage)
    const googleV = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_VISION}`;

    axios(googleV, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json, text/plain, */*",
     },
      data: {
        "requests": [
          {
            "image": {
              "content": myImage,
            },
            "features": [
              {
                "type": "TEXT_DETECTION"
              }
            ]
          }
        ]
      }
    })
    .then(response => {
      // this is the parse receipt
      console.log('response is', response)
    })
  }

  imageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image,
        imageViewer: reader.result,
      })
    }
    reader.readAsDataURL(image);
  }

  render() {
    let imageViewer = this.state.imageViewer;
    let $imageViewer = null;
    if (imageViewer) {
      $imageViewer = (<img src={imageViewer} />);
    } else {
      $imageViewer = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e)=>this.imageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imageViewer}
        </div>
      </div>
    )
  }
}

export default Upload;
