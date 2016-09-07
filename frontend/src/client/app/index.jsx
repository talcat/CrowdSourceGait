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

  constructor(props) {
      super(props);

      this.state = {imgUrl: "",
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
    }
    this.setState(Object.assign({},this.state,{imgUrl: url}));
  }

  render () {
     return <div>
       <Canvas width={1280} height={720} imgUrl={this.state.imgUrl}/>
       <FrameControls seqNum={this.state.seqNum} vidNum = {this.state.vidNum} ref="controls" imgUpdate={this.updateImgUrl.bind(this)}/>
       <LabelControls ref="labels" labels={["foo","bar"]}/>
       </div>;
  }
}

render(<App/>, document.getElementById('app'));
