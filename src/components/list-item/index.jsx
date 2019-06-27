import React from 'react';

import Icon from '@material-ui/core/Icon';

import './index.scss';

const ListItem = ({title, id, index, favorite, selected, setFavorite, selectItem}) => {
  const handleClick = e => {
    if (e.target.id.indexOf('input') !== -1) {
      setFavorite(index);
      e.stopPropagation();
      return;
    } else if (e.target.tagName !== 'SPAN') {
      selectItem(index);
      e.stopPropagation();
      return;
    }
  }

  const checkFavorite = () => {
    if (favorite) {
      return <Icon>star</Icon>;
    } else {
      return <Icon>star_border</Icon>;
    }
  }

  const getItemClass = () => `list-item ${selected ? 'selected' : ''}`.trim();

  return (
    <li className={getItemClass()} onClick={handleClick}>
      <label className="list-item-label" htmlFor={`input-${id}`}>
        {checkFavorite()}
      </label>
      <input
        type="checkbox"
        id={`input-${id}`}
        defaultChecked={false}
        className="list-item-button"
      />
      <p className="list-item-content">
        {id}. {title}
      </p>
    </li>
  )
}

export default ListItem;
