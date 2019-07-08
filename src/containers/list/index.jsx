import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import InfiniteScroll from 'react-infinite-scroller';

import ListItem from 'components/list-item';

import getData from 'services/get-data';

import sortChunks from 'utils/sort-chunks';
import unselectAll from 'utils/unselect-all';

import { RESOURCES, BUTTONS_CODE, EVENTS } from 'core/constants';

import './index.scss';

const List = ({
  onListChange, onChunksChange, list, chunks,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const itemCounter = 20;
  let hasMoreFlag = true;

  useEffect(() => {
    getData(RESOURCES.PHOTOS).then((response) => {
      const listData = response.map((listItem) => {
        listItem.isSelected = false;
        listItem.isFavorite = false;
        return listItem;
      });

      setIsCompleted(true);
      onListChange(listData);
    });
  }, []);

  const onEscapePressed = ({ keyCode }) => {
    if (keyCode === BUTTONS_CODE.ESCAPE) {
      unselectAll(chunks, onChunksChange);
    }
  };

  useEffect(() => {
    document.addEventListener(EVENTS.KEY_DOWN, onEscapePressed);
    return () => {
      document.removeEventListener(EVENTS.KEY_DOWN, onEscapePressed);
    };
  }, [chunks]);

  const toggleFavorite = (index) => {
    chunks[index].isFavorite = !chunks[index].isFavorite;
    onChunksChange(sortChunks(chunks));
  };

  const selectItem = (index) => {
    const chunksCopy = chunks.slice();
    chunksCopy[index].isSelected = !chunksCopy[index].isSelected;
    onChunksChange(chunksCopy);
  };

  const getMoreData = () => {
    if (isCompleted) {
      setTimeout(() => {
        onChunksChange(
          chunks.concat(
            list.slice(
              chunks.length, chunks.length + itemCounter,
            ),
          ),
        );
      }, 1500);
    }

    if (list.length !== 0 && list.length === chunks.length) {
      hasMoreFlag = false;
    }
  };

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
        {
          chunks.map((listItem, index) => (
            <div key={listItem.id}>
              <ListItem
                listItems={chunks}
                key={listItem.id}
                index={index}
                toggleFavorite={toggleFavorite}
                selectItem={selectItem}
                {...listItem}
              />
            </div>
          ))
        }
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
