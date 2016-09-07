import React from 'react';


class LabelControls extends React.Component {

  constructor(props) {
      super(props);
      this.state = {};
      for (var i = 0; i < props.labels.length; i+=1) {
          this.state[props.labels[i]] = false;
      }
  }

  componentDidMount() {
    window.addEventListener('keyup', function(evt) {
      var keyCode = evt.charCode | evt.keyCode;
      if (keyCode >= 49 && keyCode < 49 + this.props.labels.length) {
        var digitKey = keyCode -= 49;
        var flipLabelName = this.props.labels[digitKey];
        this.setState(function(prevState, props) {
          var flippedVal = {};
          flippedVal[flipLabelName] = Boolean(1 ^ prevState[flipLabelName]);
          return Object.assign({}, prevState, flippedVal);
        }.bind(this));
      }
    }.bind(this));
  }

  flipLabel(label) {
    this.setState(function(prevState, props) {
      var flippedVal = {};
      flippedVal[label] = Boolean(1 ^ prevState[label]);
      return Object.assign({}, prevState, flippedVal);
    }.bind(this));
  }

  render() {
    return <div>
      {this.props.labels.map(function(label){
        return <label key={label}>
          <input type="checkbox"
            name="{label}"
            onClick={function(){this.flipLabel(label)}.bind(this)}
            checked={this.state[label]}/>
          {label}
          </label>
      }.bind(this))}
    </div>
  }

}

module.exports = LabelControls;
