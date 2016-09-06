import React from 'react';

require('./canvas.css');

class ImageZoomCanvas extends React.Component {
  constructor(props) {
      super(props);
  }

  initCanvas() {
    var ctx = this.refs.canvas.getContext("2d");
    ctx.drawImage(this.refs.img,
		  this.props.sx,
		  this.props.sy,
		  this.props.sw,
		  this.props.hw,
		  0,
		  0,
		  this.props.width,
		  this.props.height);
  }

  render () {
     return <div>
     	    <canvas id="display" width={this.props.width} height={this.props.height} ref="canvas"
	    	    draggable
	    	    onDoubleClick={this.props.zoom}
		        onDragStart={this.props.dragStart}
		        onDragEnd={this.props.dragStop}
		        onDrag={this.props.drag}></canvas>
	    <img className="load"
	    	 width={this.props.width}
		     height={this.props.height}
	    	 src={this.props.imgUrl}
		     ref="img"
		     onLoad={this.initCanvas.bind(this)}/>
	    </div>;
  }

  componentDidUpdate() {
    this.initCanvas();
  }
}

module.exports = ImageZoomCanvas;
