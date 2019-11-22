import React from 'react';
import './MasterPage.css';

class Topbar extends React.Component {
    render() {
      return (
        <header className="TopBar">
          <a href="./">
            <div id="Logo">
            <h1>SWFaves</h1>
            </div>
          </a>
        </header>
      );
    }
  }

export default class MasterPage extends React.Component {
    render () {
        return (
            <Topbar />
        )
    }
}