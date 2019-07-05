import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import InfiniteScroll from 'react-infinite-scroller';

import ListItem from 'components/list-item';

import getData from 'services/get-data';

import sortChunks from 'utils/sort-chunks';
import unselectAll from 'utils/unselect-all';

import { RESOURCES, BUTTONS_CODE } from 'constants/settings';
import EVENTS from 'constants/events';

import './index.scss';

const List = ({
  onListChange, onChunksChange, list, chunks,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const itemCounter = 20;
  let hasMoreFlag = true;

  useEffect(() => {
    if (!isCompleted) {
      getData(RESOURCES.PHOTOS).then((response) => {
        const listData = response.map((listItem) => {
          listItem.selected = false;
          listItem.favorite = false;
          return listItem;
        });

        setIsCompleted(true);
        onListChange(listData);
      });
    }
  }, [isCompleted, onListChange]);

  useEffect(() => {
    const onEscapePressed = ({ keyCode }) => {
      if (keyCode === BUTTONS_CODE.ESCAPE) {
        const chunksCopy = chunks.slice();
        unselectAll(chunksCopy, onChunksChange);
      }
    };

    document.addEventListener(EVENTS.KEY_DOWN, onEscapePressed);

    return () => {
      document.removeEventListener(EVENTS.KEY_DOWN, onEscapePressed);
    };
  }, [chunks, onChunksChange]);

  const setFavorite = (listItem) => {
    const chunksCopy = chunks.slice();

    if (chunksCopy[listItem].favorite) {
      chunksCopy[listItem].favorite = false;
    } else {
      chunksCopy[listItem].favorite = true;
    }

    sortChunks(chunksCopy);
    onChunksChange(chunksCopy);
  };

  const selectItem = (listItem) => {
    const chunksCopy = chunks.slice();

    chunksCopy[listItem].selected = !chunksCopy[listItem].selected;
    onChunksChange(chunksCopy);
  };

  const getMoreData = () => {
    const chunksCopy = chunks.slice();
    const listCopy = list.slice();
    if (isCompleted) {
      setTimeout(() => {
        onChunksChange(
          chunksCopy.concat(
            listCopy.slice(
              chunksCopy.length, chunksCopy.length + itemCounter,
            ),
          ),
        );
      }, 1500);
    }

    if (listCopy.length !== 0 && listCopy.length === chunksCopy.length) {
      hasMoreFlag = false;
    }
  };

  const renderListItems = () => chunks.map((listItem, index) => (
    <div key={listItem.id}>
      <ListItem
        listItems={chunks}
        key={listItem.id}
        index={index}
        setFavorite={setFavorite}
        selectItem={selectItem}
        {...listItem}
      />
    </div>
  ));

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={getMoreData}
      threshold={10}
      hasMore={hasMoreFlag}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      <FlipMove
        staggerDurationBy={50}
        duration="500"
        typeName="div"
        className="list"
      >
        {renderListItems()}
      </FlipMove>
    </InfiniteScroll>
  );
};

List.propTypes = {
  chunks: PropTypes.arrayOf(PropTypes.object).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChunksChange: PropTypes.func.isRequired,
  onListChange: PropTypes.func.isRequired,
};

export default List;
