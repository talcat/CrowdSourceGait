import React from 'react';
import ImageZoomCanvas from './zoom-canvas.jsx'
require('./canvas.css');

class Canvas extends React.Component {
  constructor(props) {
      super(props);
      this.state = {sx: 0, sy: 0,
      		   timeOffset: 0,
             contrast: 0,
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

         return Object.assign({},state,{sx: newSX,
	 	 sy: newSY,
		 lastDragX: screenX,
		 lastDragY: screenY});
    });
    }
  }

setContrast(evt) {
  var value = evt.target.value;
  console.log(evt.target);
  console.log(value);
  this.setState(function(state, props) {
    return Object.assign({}, state, {contrast: value});
  });
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
        return Object.assign({},state,{lastDragX: screenX, lastDragY: screenY});
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
  contrast={this.state.contrast}
	width={this.props.width}
	height={this.props.height}
	imgUrl={this.props.imgUrl} />
<label> Contrast Control <input type="range" min={-100} max={100} step={1} onChange={this.setContrast.bind(this)}/></label>
    </div>;
  }

}

module.exports = Canvas;
