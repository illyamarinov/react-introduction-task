import React, { Component } from 'react';

import List from 'containers/list';
import Header from 'components/header';

import './index.scss';

class App extends Component {
  state = {
    list: [],
    chunks: [],
  }

  changeState = (stateKey, value) => {
    this.setState({
      [stateKey]: value,
    });
  }

  render() {
    const { list, chunks } = this.state;
    // console.log('app', this.state);

    return (
      <div className="app">
        <Header changeState={this.changeState} chunks={chunks} />
        <div className="app-content">
          <List changeState={this.changeState} list={list} chunks={chunks} />
        </div>
      </div>
    );
  }
}

export default App;
