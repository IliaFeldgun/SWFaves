/*App.js*/
import React, { Component } from "react";
import "./App.css";
//Import all needed Component for this tutorial
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import MasterPage from './MasterPage';
import FavoriteCharacters from './Characters';
import FilmSuggestions from './SuggestedFilms';

class App extends Component {
  render() {
    return (
        <div>
            <MasterPage />
            <Router>
                <Route exact path="/" component={FavoriteCharacters}/>
                {<Route exact path="/suggestedfilms" component={FilmSuggestions} />}
            </Router>
        </div>
    );
  }
}

export default App;