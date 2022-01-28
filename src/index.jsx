import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MovieFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// Find the root of MovieFlix app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render MovieFlix app in the root DOM element
ReactDOM.render(React.createElement(MovieFlixApplication), container);