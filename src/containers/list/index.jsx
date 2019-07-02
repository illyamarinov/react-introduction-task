import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import InfiniteScroll from 'react-infinite-scroller';

import ListItem from 'components/list-item';

import getData from 'services/get-data';

import sortChunks from 'utils/sort-chunks';
import unselectAll from 'utils/unselect-all';

import { RESOURCES, BUTTONS_CODE } from 'constants/settings';

import './index.scss';

class List extends Component {
  constructor(props) {
    super(props);
    this.itemCounter = 20;
    this.isCompleted = false;
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { changeState } = this.props;

    getData(RESOURCES.PHOTOS).then((response) => {
      const listData = response.map((item) => {
        item.selected = false;
        item.favorite = false;
        return item;
      });

      this.isCompleted = true;

      changeState('list', listData);
    });

    document.addEventListener('keydown', this.onEscapePressed);
  }

  // componentWillUpdate() {
  //   this.scrollPosition = window.pageYOffset;
  // }
  //
  componentDidUpdate() {
    console.log('componentDidUpdate');
    // window.scrollTo(0, this.scrollPosition);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapePressed);
  }

  onEscapePressed = ({ keyCode }) => {
    const { chunks, changeState } = this.props;

    if (keyCode === BUTTONS_CODE.ESCAPE) {
      unselectAll(chunks, changeState);
    }
  }

  setFavorite = (item) => {
    const { chunks, changeState } = this.props;

    if (chunks[item].favorite) {
      chunks[item].favorite = false;
    } else {
      chunks[item].favorite = true;
    }

    sortChunks(chunks);
    changeState('chunks', chunks);
  }

  selectItem = (item) => {
    const { chunks, changeState } = this.props;

    chunks[item].selected = !chunks[item].selected;
    changeState('chunks', chunks);
  }

  getMoreData = () => {
    const { list, chunks, changeState } = this.props;

    if (this.isCompleted) {
      setTimeout(() => {
        changeState('chunks', chunks.concat(list.slice(chunks.length, chunks.length + this.itemCounter)));
      }, 1500);
    }
  };

  renderListItems = () => {
    const { chunks } = this.props;

    return chunks.map((item, index) => (
      <div key={item.id}>
        <ListItem
          listItems={chunks}
          key={item.id}
          index={index}
          setFavorite={this.setFavorite}
          selectItem={this.selectItem}
          {...item}
        />
      </div>
    ));
  }

  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getMoreData}
        threshold={10}
        hasMore
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <FlipMove
          duration="1000"
          typeName="div"
          className="list"
        >
          {this.renderListItems()}
        </FlipMove>
      </InfiniteScroll>
    );
  }
}

List.propTypes = {
  chunks: PropTypes.arrayOf(PropTypes.object).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeState: PropTypes.func.isRequired,
};

export default List;
