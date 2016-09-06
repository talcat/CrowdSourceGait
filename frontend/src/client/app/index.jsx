import React from 'react';
import {render} from 'react-dom';
import Canvas from './canvas.jsx'

class App extends React.Component {
  render () {
     return <div>  <Canvas width={512} height={512} /> </div>;
  }
}

render(<App/>, document.getElementById('app'));

