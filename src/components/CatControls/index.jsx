import * as React from 'react';
import './style.css';

class CatControls extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="cat-controls">
        <button className="control-button" type="button">
          Feed
        </button>
        <button className="control-button" type="button">
          Pet
        </button>
        <button className="control-button" type="button">
          Change Background
        </button>
      </div>
    )
  }
}

export default CatControls
