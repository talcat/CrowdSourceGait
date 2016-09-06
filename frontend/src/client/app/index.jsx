import React from 'react';
import {render} from 'react-dom';
import Canvas from './canvas.jsx'
import FrameControls from './frame-controls.jsx'


class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {imgUrl: ""}
  }


  updateImgUrl(url) {
    this.setState({imgUrl: url});
  }

  render () {
     return <div>
       <Canvas width={1280} height={720} imgUrl={this.state.imgUrl}/>
       <FrameControls filename="blah" ref="controls" imgUpdate={this.updateImgUrl.bind(this)}/>
       </div>;
  }
}

render(<App/>, document.getElementById('app'));
