import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';

import ListItem from 'components/list-item';

import './index.scss';

const List = ({ listItems, setFavorite, selectItem }) => (
  <ul className="list">
    <FlipMove duration="1000">
      {listItems.map((item, index) => (
        <ListItem
          key={item.id}
          index={index}
          setFavorite={setFavorite}
          selectItem={selectItem}
          {...item}
        />
      ))}
    </FlipMove>
  </ul>
);

List.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFavorite: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default List;
