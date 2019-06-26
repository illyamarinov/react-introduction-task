import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import getData from 'services/get-data';
import { RESOURCES } from 'constants/settings';

import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      chunks: [],
    }

    this.itemCounter = 20;
    this.isCompleted = false;
  }

  componentDidMount() {
    getData(RESOURCES.PHOTOS).then((response) => {
      this.isCompleted = true;
      this.setState({
        list: response,
      })
    });
  }

  getMoreData = () => {
    const { list, chunks } = this.state;
    if (this.isCompleted) {
      setTimeout(() => {
        this.setState({
          chunks: chunks.concat(list.slice(chunks.length, chunks.length + this.itemCounter)),
        });
      }, 1500);
    }
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>items list</h1>
        </header>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.getMoreData}
          threshold={1}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div className="app-content">
            {this.state.chunks.map((item, index) => (
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
