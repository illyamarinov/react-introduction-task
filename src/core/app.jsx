import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import List from 'components/list';

import getData from 'services/get-data';
import sortChunks from 'utils/sort-chunks';
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

    document.addEventListener("keydown", this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed);
  }

  onKeyPressed = (e) => {
    if (e.keyCode === 27) {
      this.unselectAll();
    }
  }

  unselectAll = () => {
    const { chunks } = this.state;

    chunks.forEach((item) => {
      item.selected = false;
    });

    this.setState({
      chunks: chunks
    });
  }

  setFavorite = (item) => {
    const { chunks } = this.state;

    if (chunks[item].favorite) {
      chunks[item].favorite = false;
    } else {
      chunks[item].favorite = true;
    }

    sortChunks(chunks);
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

            <List
              listItems={this.state.chunks}
              selectItem={this.selectItem}
              setFavorite={this.setFavorite}
            />

          </div>
        </InfiniteScroll>

      </div>
    );
  }
}

export default App;
