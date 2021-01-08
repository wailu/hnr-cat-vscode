import * as React from 'react';
import './style.css';
// cat moods
import testCat from './assets/catMoods/catFace1.png'
// cat backgrounds
import beachBg from './assets/backgrounds/test.png'

class CatPanel extends React.Component {

  render() {
    const mood = ({
        'idle': testCat
    })[this.props.catMood]

    const background = ({
      'beach': beachBg
    })[this.props.background]

    return (
      <div className="cat-panel" style={{ backgroundImage: `url(${background})` }}>
        <img src={mood} className="cat-image" alt="cat" />
      </div>
    )
  }
}

export default CatPanel;
