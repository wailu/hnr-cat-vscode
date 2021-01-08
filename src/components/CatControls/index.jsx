import * as React from 'react';
import './style.css';

class CatControls extends React.Component {

  render() {
    return (
      <div className="cat-controls">
        <button onClick={() => this.props.changeCatMood()} className="control-button" type="button">
          Feed
        </button>
        <button onClick={() => this.props.changeCatMood()} className="control-button" type="button">
          Pet
        </button>
        <button onClick={() => this.props.changeBackground('fail')} className="control-button" type="button">
          Change Background
        </button>
      </div>
    )
  }
}

export default CatControls
