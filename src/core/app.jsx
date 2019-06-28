import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import List from 'components/list';
import Control from 'components/control';

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
    };
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

    document.addEventListener('keydown', this.onEscapePressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapePressed);
  }

  onEscapePressed = ({ keyCode }) => {
    if (keyCode === 27) {
      this.unselectAll();
    }
  }

  resetAll = () => {
    const chunks = this.state.chunks.slice();

    chunks.forEach((item) => {
      item.selected = false;
      item.favorite = false;
    });

    chunks.sort((first, second) => first.id - second.id);

    this.setState({
      chunks,
    });
  }

  unselectAll = () => {
    const chunks = this.state.chunks.slice();

    chunks.forEach((item) => {
      item.selected = false;
    });

    this.setState({
      chunks,
    });
  }

  setSelectedFavorite = () => {
    const chunks = this.state.chunks.slice();

    chunks.forEach((item) => {
      if (item.selected) {
        item.favorite = true;
      }
    });
    sortChunks(chunks);

    this.setState({
      chunks,
    });
  }

  unsetSelectedFavorite = () => {
    const chunks = this.state.chunks.slice();

    chunks.forEach((item) => {
      if (item.selected && item.favorite) {
        item.favorite = false;
      }
    });
    sortChunks(chunks);

    this.setState({
      chunks,
    });
  }

  setFavorite = (item) => {
    const chunks = this.state.chunks.slice();

    if (chunks[item].favorite) {
      chunks[item].favorite = false;
    } else {
      chunks[item].favorite = true;
    }

    sortChunks(chunks);
    this.setState({
      chunks,
    });
  }

  selectItem = (item) => {
    const chunks = this.state.chunks.slice();

    chunks[item].selected = !chunks[item].selected;
    this.setState({
      chunks,
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
          <h1 className="app-header__title">React Introduction Task</h1>
          <div className="app-navbar">
            <Control
              text="Favorite"
              controlType={this.setSelectedFavorite}
            />
            <Control
              text="Unfavorite"
              controlType={this.unsetSelectedFavorite}
            />
            <Control
              text="Reset"
              controlType={this.resetAll}
            />
          </div>
        </header>

        <InfiniteScroll
          pageStart={0}
          loadMore={this.getMoreData}
          threshold={10}
          hasMore
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
