import React from 'react';


class FrameControls extends React.Component {

  constructor(props) {
      super(props);
      this.state = {frameNumber: 0};
  }

  nextFrame() {
    this.changeFrame(1);
  }

  prevFrame() {
    this.changeFrame(-1);
  }

  changeFrame(offset) {
    if (this.state.frameNumber + offset < 0) {
      // dont go to negative frames
      return;
    }

    this.setState(function(prevState, props) {
      var newState = {frameNumber: prevState.frameNumber + offset}
      this.props.imgUpdate(this.getFrameUrl(newState));
      return newState;
    });
  }

  getFrameUrl(state) {
    return "/getImages/" + this.props.seqNum + "/" + this.props.vidNum + "/"+ state.frameNumber;
  }

  componentDidMount() {
    this.props.imgUpdate(this.getFrameUrl(this.state));
    window.addEventListener('keyup', function(evt) {
      if (evt.charCode | evt.keyCode == 37) {
        this.prevFrame();
      } else if (evt.charCode | evt.keyCode == 39)
      this.nextFrame();
    }.bind(this));
  }

  render () {
    return <div>
      <button type="button" onClick={this.prevFrame.bind(this)}> Prev </button>
      <button type="button" onClick={this.nextFrame.bind(this)}> Next </button>
    </div>;
  }
}

module.exports = FrameControls;
