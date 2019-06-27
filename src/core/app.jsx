import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import List from 'components/list';

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
      response.forEach((item) => {
        item.selected = false;
        item.favorite = false;
      });
      this.isCompleted = true;
      this.setState({
        list: response,
      });
    });
  }

  sortItems = (chunks, query) => {
    switch (query) {
      case "favorite":
        chunks.sort((first, second) => {
          return (first.favorite === second.favorite) ? 0 : first.favorite ? -1 : 1;
        });
        break;
      default:
        chunks.sort((first, second) => {
          return first.id - second.id;
        });
    }
  }

  setFavorite = (item) => {
    const { chunks } = this.state;
    if (chunks[item].favorite) {
      chunks[item].favorite = false;
      this.sortItems(chunks);
    } else {
      chunks[item].favorite = true;
    }
    this.sortItems(chunks, 'favorite');
    this.setState({
      chunks: chunks
    });
  }

  selectItem = (item) => {
    const { chunks } = this.state;
    chunks[item].selected = !chunks[item].selected;
    this.setState({
      chunks: chunks
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
          <h1>React Introduction Task</h1>
        </header>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.getMoreData}
          threshold={10}
          hasMore={true}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div className="app-content">
            <List listItems={this.state.chunks} selectItem={this.selectItem} setFavorite={this.setFavorite}/>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
