import React from 'react';
import {Character} from '../basiccomponents/Character'
import renderer from 'react-test-renderer'

it('renders a character', () => {
  const character = renderer.create(<Character character={{name: "Ilusha"}} />).toJSON();

  expect(character).toMatchSnapshot();
});