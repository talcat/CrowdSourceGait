import React from 'react';
import ImageZoomCanvas from './zoom-canvas.jsx'
require('./canvas.css');

class Canvas extends React.Component {
  constructor(props) {
      super(props);
      this.state = {sx: 0, sy: 0,
      		 timeOffset: 0,
      		 sw: this.props.width,
		 hw: this.props.height};
  }
  
  zoom (evt) {
    this.setState(function(state, props) {
         return {sx: state.sx, sy: state.sy, sw: state.sw/2, hw: state.hw/2, timeOffset: state.timeOffset};
    });
  }

  drag(evt) {
    var screenX = evt.screenX;
    var screenY = evt.screenY;
    if (!(screenX == 0 && screenY == 0)) {
    this.setState(function(state, props) {
         var xDelta = this.state.lastDragX - screenX;
         var yDelta = this.state.lastDragY - screenY;    
         var newSX = Math.min(props.width - state.sw, Math.max(0,state.sx+xDelta));
         var newSY = Math.min(props.height - state.hw, Math.max(0,state.sy+yDelta));

         return {sx: newSX,
	 	 sy: newSY,
		 timeOffset: state.timeOffset,
		 sw: state.sw,
		 hw: state.hw,
		 lastDragX: screenX,
		 lastDragY: screenY};
    });
    }
  }

dragStart(evt) {
   var dragIcon = document.createElement('img');
   // empty png
   dragIcon.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
   dragIcon.width = 0;
   evt.persist();
   var screenX = evt.screenX;
   var screenY = evt.screenY;   
   evt.dataTransfer.setDragImage(dragIcon, 0, 0);
    this.setState(function(state, props) {
         return {sx: state.sx, sy: state.sy, sw: state.sw, hw: state.hw, lastDragX: screenX, lastDragY: screenY, timeOffset: state.timeOffset};
    });   
 }

  advanceFrame() {
    this.setState(function(state, props) {
      return {sx: state.sx, sy: state.sy, sw: state.sw, hw: state.hw, lastDragX: state.lastDragX, lastDragY: state.lastDragY, timeOffset: state.timeOffset + 1.0/30.0};
    });
  }

  render () {
    return <div>
      <ImageZoomCanvas
        drag={this.drag.bind(this)}
	dragStart={this.dragStart.bind(this)}
	dragStop={(evt)=>{}}
	zoom={this.zoom.bind(this)}
	currentTime={this.state.timeOffset}
	sx={this.state.sx}
	sy={this.state.sy}
	sw={this.state.sw}
	hw={this.state.hw}
	width={this.props.width}
	height={this.props.height}
	videoUrl="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"
	imgUrl={"https://upload.wikimedia.org/wikipedia/en/2/24/Lenna.png"} />
	<button type="button" onClick={this.advanceFrame.bind(this)}> Next </button>
    </div>;
  }
  
}

module.exports = Canvas;
