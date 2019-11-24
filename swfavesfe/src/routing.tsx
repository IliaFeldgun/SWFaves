import React, { Component } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import MasterPage from './MasterPage';
import FavoriteCharacters from './Characters';
import FilmSuggestions from './SuggestedFilms';
import { suggestionsRoute } from "./config";

class App extends Component {
  render() {
    return (
        <div>
            <MasterPage />
            <Router>
                <Route exact path="/" component={FavoriteCharacters}/>
                {<Route exact path={suggestionsRoute} component={FilmSuggestions} />}
            </Router>
        </div>
    );
  }
}

export default App;