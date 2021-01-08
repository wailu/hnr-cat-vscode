import * as React from 'react';
import './App.css';
import CatPanel from './components/CatPanel'
import CatControls from './components/CatControls'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // below are defaults!!
      background: 'beach',
      catMood: 'idle'
    };
    this.changeBackground = this.changeBackground.bind(this)
    this.changeCatMood = this.changeCatMood.bind(this)
  }

  changeBackground(background) {
    this.setState({background})
  }

  changeCatMood(catMood) {
    console.log('Change cat mood clicked')
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
