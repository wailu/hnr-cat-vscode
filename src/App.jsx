import * as React from 'react';
import './App.css';
import CatPanel from './components/CatPanel'
import CatControls from './components/CatControls'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      background: 'beach',
      catMood: 'idle'
    };
    this.changeBackground = this.changeBackground.bind(this)
    this.changeCatMood = this.changeCatMood.bind(this)
  }

  changeBackground() {
    const backgrounds = ['beach', 'backyard', 'park', 'snowvillage']
    const nextIndex = (backgrounds.findIndex(bg => bg === this.state.background) + 1) % backgrounds.length
    const background = backgrounds[nextIndex]
    
    this.setState({background})
  }

  changeCatMood(catMood) {
    this.setState({catMood})

    // we want to only temporarily change the mood
    setTimeout(
      () => this.setState({catMood: 'idle'}),
      5000
    )
  }

  render() {
    return (
      <div className="app">
        <CatPanel background={this.state.background} catMood={this.state.catMood} />
        <CatControls changeBackground={this.changeBackground} changeCatMood={this.changeCatMood} />
      </div>
    );
  }
}

export default App;
