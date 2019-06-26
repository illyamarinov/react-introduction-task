import React from 'react';

import ListItem from 'components/list-item';

import './index.scss';

const List = ({listItems, onClick}) => {
  return (
    <ul className="list">
      {listItems.map((item, index) => {
        return (<ListItem
                  key={item.id}
                  index={index}
                  onClick={onClick}
                  {...item} 
                />)
      })}
    </ul>
  )
}

export default List;
