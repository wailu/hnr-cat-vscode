import * as React from 'react';
import './style.css';

class CatControls extends React.Component {

  render() {
    return (
      <div className="cat-controls">
        <button onClick={() => this.props.changeCatMood('eat')} className="control-button" type="button">
          Feed
        </button>
        <button onClick={() => this.props.changeCatMood('pat')} className="control-button" type="button">
          Pat
        </button>
        <button onClick={() => this.props.changeBackground()} className="control-button" type="button">
          Change Background
        </button>
      </div>
    )
  }
}

export default CatControls
