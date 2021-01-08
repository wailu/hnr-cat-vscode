import * as React from 'react';
import './App.css';
import CatPanel from './components/CatPanel'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CatPanel />
      </div>
    );
  }
}

export default App;
