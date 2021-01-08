import * as React from 'react';
import './style.css';
// cat moods
import catIdle from './assets/catMoods/babycat-idle.png'
import catFed from './assets/catMoods/adultcat-idle.png'
import catEat from './assets/catMoods/babycat-eat.png'
import catPat from './assets/catMoods/babycat-pat.png'
import catSleep from './assets/catMoods/babycat-sleep.png'
import catActive from './assets/catMoods/babycat-active.png'

// cat backgrounds
import beachBg from './assets/backgrounds/beach.png'
import backyardBg from './assets/backgrounds/backyard.png'
import parkBg from './assets/backgrounds/park.png'
import snowvillageBg from './assets/backgrounds/snowvillage.png'

class CatPanel extends React.Component {

  render() {
    const mood = ({
        'idle': catIdle,
        'idle2': catFed,
        'eat': catEat,
        'pat': catPat,
        'sleep': catSleep,
        'active': catActive
    })[this.props.catMood]

    const background = ({
      'beach': beachBg,
      'backyard': backyardBg,
      'park': parkBg,
      'snowvillage': snowvillageBg
    })[this.props.background]

    return (
      <div className="cat-panel" style={{ backgroundImage: `url(${background})` }}>
        <img src={mood} className="cat-image" alt="cat" />
      </div>
    )
  }
}

export default CatPanel;
