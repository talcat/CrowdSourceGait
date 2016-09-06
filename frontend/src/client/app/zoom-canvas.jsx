import React from 'react';

require('./canvas.css');

class ImageZoomCanvas extends React.Component {
  constructor(props) {
      super(props);
  }

  initCanvas() {
    var ctx = this.refs.canvas.getContext("2d");
    ctx.drawImage(this.refs.video,
		  this.props.sx,
		  this.props.sy,
		  this.props.sw,
		  this.props.hw,
		  0,
		  0,
		  this.props.width,
		  this.props.height);
  }
  
  initVideo() {
    this.initCanvas();
    this.refs.video.currentTime = this.props.currentTime;
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
            <video className="load"
	         id="foo"
		 src={this.props.videoUrl}
		 muted
		 preload="auto"
		 onCanPlay={this.initVideo.bind(this)}
		 ref="video"></video>
	    </div>;
  }
  componentDidUpdate() {
    this.initCanvas();
  }
}

module.exports = ImageZoomCanvas;
