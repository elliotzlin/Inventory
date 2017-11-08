import React, { Component } from 'react';
import './style/App.css';
import axios from 'axios';
import Upload from './Upload';
import InfoRow from './InfoRow';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageViewer: '',
      infoRow: [],
      categories: [],
    }
  }

  processImage = (e) => {
    e.preventDefault();
    const { imageViewer } = this.state;
    let myImage = imageViewer.slice(22, imageViewer.length);
    const googleV = `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_VISION}`;

    axios(googleV, {
      method: 'POST',
      mode: 'cors',
      data: {
        "requests": [
          {
            "image": {
              "content": myImage,
            },
            "features": [
              {
                "type": "DOCUMENT_TEXT_DETECTION"
              }
            ]
          }
        ]
      }
    })
    .then(response => {
      // this is the parse receipt
      let infoRow = (response) ? response.data.responses[0].textAnnotations[0].description.split('\n') : null;
      return infoRow;
    })
    .then(infoRow => {
      if (infoRow) {
        this.setState({ infoRow });
      } else {
        return;
      }
    })
  }

  imageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let image = e.target.files[0];
    reader.readAsDataURL(image);

    reader.onloadend = () => {
      this.setState({
        image,
        imageViewer: reader.result,
      });
    };
  }

  addCategory = (item) => {
    this.setState(prevState => ({
      categories: prevState.categories.concat(item),
    }));
  }

  updateCat = (cat) => {
    this.setState({ categories: cat });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header
            {...this.state}
            updateCat={this.updateCat}
            addCategory={this.addCategory}
            imageChange={this.imageChange}
          />
        </header>
        <div className="App-container">
          <Upload {...this.state}
            processImage={this.processImage}
            imageChange={this.imageChange}
          />
          <InfoRow {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
