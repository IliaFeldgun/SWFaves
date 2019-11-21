import React from 'react';
import './General.css';
import ReactDOM from 'react-dom';
//import './index.css';
import FavoriteCharacters from './Characters';
import App from './nav';
//import { restElement } from '@babel/types';
//import * as serviceWorker from './serviceWorker';
import { Router} from 'react-router';

//ReactDOM.render(<FavoriteCharacters/> , document.getElementById('root'))
ReactDOM.render(<App/> , document.getElementById('root'))


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
