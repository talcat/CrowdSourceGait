import React from 'react';

require('./canvas.css');

class ImageZoomCanvas extends React.Component {
  constructor(props) {
      super(props);
  }

 contrastImage(imgData, contrast){  //input range [-100..100]
      var d = imgData.data;
      contrast = (contrast/100) + 1;  //convert to decimal & shift range: [0..2]
      var intercept = 128 * (1 - contrast);
      for(var i=0;i<d.length;i+=4){   //r,g,b,a
          d[i] = d[i] * contrast + intercept;
          d[i+1] = d[i+1] * contrast + intercept;
          d[i+2] = d[i+2] * contrast + intercept;
      }
      return imgData;
  }


  initCanvas() {
    var canvas = document.createElement('canvas');
    var virtualContext = canvas.getContext('2d');

    canvas.width = this.refs.img.width;
    canvas.height = this.refs.img.height;

    virtualContext.drawImage(this.refs.img, 0, 0 );
    var virtualData = virtualContext.getImageData(0, 0, this.refs.img.width, this.refs.img.height);
    var contrastedImg = this.contrastImage(virtualData, this.props.contrast);
    virtualContext.fillStyle = "rgb(255,255,255)";
    virtualContext.fillRect(0,0,this.refs.img.width, this.refs.img.height);
    virtualContext.putImageData(contrastedImg,0,0);
    var ctx = this.refs.canvas.getContext("2d");
    ctx.drawImage(canvas,
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
