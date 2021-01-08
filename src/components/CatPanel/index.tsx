import * as React from 'react';
import './style.css';
import testCat from './catMoods/catFace1.png'

class CatPanel extends React.Component {

  constructor(props: Readonly<{}>) {
    super(props);
  }

  public render() {
    return (
      <div className="cat-panel">
        <img src={testCat} className="cat-image" alt="cat" />
      </div>
    )
  }
}

export default CatPanel;
