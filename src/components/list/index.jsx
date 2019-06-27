import React from 'react';

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

export default List;
