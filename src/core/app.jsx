import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import ListItem from 'components/list-item';
import Header from 'components/header';

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
    this.listRef = React.createRef();
  }

  componentDidMount() {
    getData(RESOURCES.PHOTOS).then((response) => {
      const listData = response.map((item) => {
        item.selected = false;
        item.favorite = false;
        return item;
      });

      this.isCompleted = true;

      this.setState({
        list: listData,
      });
    });

    document.addEventListener('keydown', this.onEscapePressed);
  }

  // componentWillUpdate() {
  //   this.scrollPosition = window.pageYOffset;
  // }
  //
  // componentDidUpdate() {
  //   window.scrollTo(0, this.scrollPosition);
  // }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapePressed);
  }

  onEscapePressed = ({ keyCode }) => {
    if (keyCode === 27) {
      this.unselectAll();
    }
  }

  resetAll = () => {
    const { chunks } = this.state;

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
    const { chunks } = this.state;

    chunks.forEach((item) => {
      item.selected = false;
    });

    this.setState({
      chunks,
    });
  }

  setSelectedFavorite = () => {
    const { chunks } = this.state;

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
    const { chunks } = this.state;

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
    const { chunks } = this.state;

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
    const { chunks } = this.state;

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
    const { chunks } = this.state;

    return (
      <div
        className="app"
      >
        <Header
          setSelectedFavorite={this.setSelectedFavorite}
          unsetSelectedFavorite={this.unsetSelectedFavorite}
          resetAll={this.resetAll}
        />

        <InfiniteScroll
          pageStart={0}
          loadMore={this.getMoreData}
          threshold={10}
          hasMore
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          <div className="app-content">

            <ListItem
              listItems={chunks}
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
