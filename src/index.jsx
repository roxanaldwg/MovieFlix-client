import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MovieFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Find the root of MovieFlix app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render MovieFlix app in the root DOM element
ReactDOM.render(React.createElement(MovieFlixApplication), container);