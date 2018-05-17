import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Switch>
          <Route path="/" exact />
        </Switch>

      </div>
    );
  }
}

export default App;
