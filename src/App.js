import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
            <Container as='main' id='content' className='content content--home'>
                <h1>Neighborhood Map</h1>
            </Container>
      </div>
    );
  }
}

export default App;
