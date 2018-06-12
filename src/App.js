import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';
import Books from "./containers/Books"
import Cart from './containers/Cart'
import BookPage from './containers/BookPage'
import Favorites from './containers/Favorites'

import Header from './components/Header'
import NoMatch from './components/NoMatch'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>

        <Switch>
          <Route exact path="/" component={Books} />
          <Route path="/cart" component={Cart} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/book/:id" component={BookPage} />
          <Route component={NoMatch} />
        </Switch>

      </div>
    );
  }
}

export default App
