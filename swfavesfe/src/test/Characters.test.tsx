import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from '../routing'
import renderer from 'react-test-renderer'
import FavoriteCharacters, { CharacterList, SuggestButton } from '../Characters';
import { getAllPeople } from '../APIAccess';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders a character list', () => {
    const characterList = renderer.create(<Router><CharacterList listSource={getAllPeople()} /></Router>).toJSON();
  
    expect(characterList).toMatchSnapshot();
  });

  it('renders a suggest button', () => {
    const suggestButton = renderer.create(<Router><SuggestButton FavoritesList={['Luke', 'Sky']} /></Router>).toJSON();
  
    expect(suggestButton).toMatchSnapshot();
  });

  it('renders Favourite Characters without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Router><FavoriteCharacters /></Router>, div);
    ReactDOM.unmountComponentAtNode(div);
  });