import React from 'react';
import {render} from 'react-dom';
import Canvas from './canvas.jsx'
import FrameControls from './frame-controls.jsx'
import LabelControls from './LabelControls.jsx'


class App extends React.Component {

  getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  componentDidMount() {
    this.refs.controls.changeFrame(0);
  }

  constructor(props) {
      super(props);

      this.state = {imgUrl: "",
        frameNumber: 0,
        seqNum: this.getParameterByName("seqNum") || 1,
        vidNum: this.getParameterByName("vidNum") || 1}
  }

  updateImgUrl(url) {
    // change frames
    if(this.refs.labels) {
      fetch("/labelFrame/" + this.state.seqNum + "/" + this.state.vidNum + "/" + this.refs.controls.state.frameNumber,
        {
          method: "POST",
          body: JSON.stringify(this.refs.labels.state)
        }
      );
      this.refs.labels.changeFrame();
    }

    var frameNumber = this.state.frameNumber;
    if (this.refs.controls != null) {
      frameNumber = this.refs.controls.state.frameNumber;
    }

    this.setState(Object.assign({}, this.state, {imgUrl: url, frameNumber: frameNumber}));
  }

  render () {
     return <div>
       <Canvas width={1280} height={720} imgUrl={this.state.imgUrl}/>
       <FrameControls seqNum={this.state.seqNum} vidNum = {this.state.vidNum} ref="controls" imgUpdate={this.updateImgUrl.bind(this)}/>
       <LabelControls ref="labels" labels={["foo","bar"]} seqNum={this.state.seqNum} vidNum = {this.state.vidNum}   frameNumber={this.state.frameNumber}/>
       </div>;
  }
}

render(<App/>, document.getElementById('app'));
