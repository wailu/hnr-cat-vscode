import * as React from 'react';
import throttle from 'lodash.throttle';
import './App.css';
import CatPanel from './components/CatPanel'
import CatControls from './components/CatControls'

class App extends React.Component {

  componentDidMount() {
    // pure javascript to listen to events coming from vscode
    window.addEventListener('message', throttle(event => {
      const message = event.data;

      if (message.type === 'userTyping') {
        // user types, cat types too
        this.setState({catMood: 'active'})
        // set up cat to sleep if user inactive
        this.setSleepTimeout()
      }
    }, 30000, { 'trailing': false }))

    // set up cat to sleep if user inactive
    this.setSleepTimeout()
  }

  constructor(props) {
    super(props);
    this.state = {
      background: 'beach',
      catMood: 'idle',
      sleepTimeoutRef: () => 1
    };
    this.changeBackground = this.changeBackground.bind(this)
    this.changeCatMood = throttle(this.changeCatMood.bind(this), 5000, { 'trailing': false })
    this.setSleepTimeout = this.setSleepTimeout.bind(this)
  }

  changeBackground() {
    const backgrounds = ['beach', 'backyard', 'park', 'snowvillage']
    const nextIndex = (backgrounds.findIndex(bg => bg === this.state.background) + 1) % backgrounds.length
    const background = backgrounds[nextIndex]
    
    this.setState({background})
  }

  changeCatMood(catMood) {
    console.log('cat mood called', catMood)
    this.setState({catMood})

    // we want to only temporarily change the mood
    setTimeout(
      () => this.setState({catMood: 'idle'}),
      5000)

    // reset sleep timer
    this.setSleepTimeout()
  }

  setSleepTimeout() {
    if (this.state.sleepTimeoutRef) {
      clearTimeout(this.state.sleepTimeoutRef)
    }

    const sleepTimeoutRef = setTimeout(
      () => this.setState({catMood: 'sleep'}), 900000
    )

    this.setState({sleepTimeoutRef})
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
