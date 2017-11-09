import React, { Component } from 'react';
import './style/App.css';
import axios from 'axios';
import Upload from './Upload';
import InfoRow from './InfoRow';
import Header from './Header';
import DelModal from './DelModal';
import EditModal from './EditModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageViewer: '',
      infoRow: [],
      categories: [],
      isDel: false,
      isMerge: false,
      isDelModal: false,
      isEditModal: false,
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
    if (!image) return;
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

  updateUtilsBtn = (isDel, isMerge) => {
    if (isDel === true) {
      this.setState({ isDel: true });
    } else if (isDel === false) {
      this.setState({ isDel: false });
    }
    if (isMerge === true) {
      this.setState({ isMerge: true });
    } else if (isMerge === false) {
      this.setState({ isMerge: false });
    }
  }

  callDelModal = () => {
    this.setState({ isDelModal: !this.state.isDelModal });
  }

  delModalYes = () => {
    const newCat = this.state.categories.filter((cat) => {
      return cat.x === false;
    });
    this.setState({
      categories: newCat,
      isDelModal: false,
      isDel: false,
    }, () => {
      let isCheckMark = false;
      let categories = this.state.categories;
      for (var i=0; i<categories.length; i++) {
        if (categories[i].checkMark) isCheckMark = true;
      }
      if (isCheckMark) {
        this.setState({ isMerge: true });
      } else {
        this.setState({ isMerge: false });
      }
    })
  }

  delModalNo = () => {
    this.setState({ isDelModal: false });
  }

  editCatName = (cat) => {
    this.setState({ isEditModal: !this.state.isEditModal });
    this.cat = cat;
  }

  submitNewCatName = (cats) => {
    this.setState({ categories: cats });
  }

  render() {
    return (
      <div className="App">
        <span className="site-name"><strong>INVENTORY - BA</strong></span>
        <header className="App-header">
          <Header
            {...this.state}
            editCatName={this.editCatName}
            callDelModal={this.callDelModal}
            updateUtilsBtn={this.updateUtilsBtn}
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
        {this.state.isEditModal ? (
          <div className="modal">
            <EditModal
              cat={this.cat}
              submitNewCatName={this.submitNewCatName}
              editCatName={this.editCatName}
              categories={this.state.categories}
            />
          </div> ) : null
        }
        {this.state.isDelModal &&
          <div className="modal">
            <DelModal delModalYes={this.delModalYes} delModalNo={this.delModalNo} />
          </div>
        }
      </div>
    );
  }
}

export default App;
