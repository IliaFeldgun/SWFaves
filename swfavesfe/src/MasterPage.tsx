import React from 'react';
import './MasterPage.css';

class Topbar extends React.Component {
    render() {
      return (
        <header className="TopBar">
          <div id="Logo">
            <h1>SWFaves</h1>
          </div>
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