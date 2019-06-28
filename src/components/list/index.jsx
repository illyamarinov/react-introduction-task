import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/list-item';

import './index.scss';

const List = ({ listItems, setFavorite, selectItem }) => (
  <ul className="list">
    {listItems.map((item, index) => (
      <ListItem
        key={item.id}
        index={index}
        setFavorite={setFavorite}
        selectItem={selectItem}
        {...item}
      />
    ))}
  </ul>
);

List.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFavorite: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default List;
