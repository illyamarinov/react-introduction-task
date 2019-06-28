import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/list-item';

import './index.scss';

const List = ({listItems, setFavorite, selectItem}) => {
  return (
    <ul className="list">
      {listItems.map((item, index) => {
        return (
          <ListItem
            key={item.id}
            index={index}
            setFavorite={setFavorite}
            selectItem={selectItem}
            {...item}
          />
        )
      })}
    </ul>
  )
}

ListItem.propTypes = {
  listItems: PropTypes.array,
  setFavorite: PropTypes.func,
  selectItem: PropTypes.func
}

export default List;
