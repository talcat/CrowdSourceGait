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


setOldLabelState() {
  fetch("/getFrameData/" + this.props.seqNum + "/" + this.props.vidNum + "/" + this.props.frameNumber).then(
    function(resp) {
      return resp.json();
    }
  ).then(function(json) {
    if (json != null) {
      // make sure we aren't doing something dumb here
      this.setState(json);
    }
  }.bind(this))
}

  flipLabel(label) {
    this.setState(function(prevState, props) {
      var flippedVal = {};
      flippedVal[label] = Boolean(1 ^ prevState[label]);
      return Object.assign({}, prevState, flippedVal);
    }.bind(this));
  }

  changeFrame() {
    this.setOldLabelState();
  }

  render() {
    console.log(this.state);
    return <div>  <p>{this.props.frameNumber}</p>

      {this.props.labels.map(function(label){
        console.log(label);
        console.log(this.state[label]);

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
