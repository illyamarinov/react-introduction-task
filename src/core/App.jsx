import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import getData from '../services/get-data';
import { RESOURCES } from '../constants/settings';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      chanks: [],
      itemCounter: 20,
    }

    this.getMoreData = this.getMoreData.bind(this);
  }

  componentDidMount() {
    getData(RESOURCES.PHOTOS).then((response) => {
      this.setState({
        list: response,
      })
    });
  }

  getMoreData() {
    console.log('getMoreData');
    const chanksLength = this.state.chanks.length;

    setTimeout(() => {
      this.setState({
        chanks: this.state.chanks.concat(this.state.list.slice(chanksLength, chanksLength + this.state.itemCounter)),
      });
    }, 2000);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>items list</h1>
        </header>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.getMoreData}
          threshold={1}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div className="App-content">
            {this.state.chanks.map((item, index) => (
              <div className="item" key={index}>
                div - #{index}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
