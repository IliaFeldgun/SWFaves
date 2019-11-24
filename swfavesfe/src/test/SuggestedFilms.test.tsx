import React from 'react';
import ReactDOM, { render } from 'react-dom';
import renderer from 'react-test-renderer'
import { getSuggestedMovies } from '../APIAccess';
import { FilmList, ShareButton } from '../SuggestedFilms';



it('renders a film list', () => {
    let userID = 609074512;
    const filmsList = renderer.create(<FilmList listSource={getSuggestedMovies(userID)} />).toJSON();
  
    expect(filmsList).toMatchSnapshot();
  });
  it('renders a share button', () => {
    const shareButton = renderer.create(<ShareButton />).toJSON();
    expect(shareButton).toMatchSnapshot();
  });