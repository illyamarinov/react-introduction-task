import React from 'react';

import Icon from '@material-ui/core/Icon';

import './index.scss';

const ListItem = ({title, id, index, favorite, selected, setFavorite, selectItem}) => {

  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorite(index);
  }

  const handleSelect = () => {
    selectItem(index);
  }

  return (
    <li
      className={`list-item${selected ? ' selected' : ''}`}
      onClick={handleSelect}
    >
      <label
        className="list-item-label"
        htmlFor={`input-${id}`}
        onClick={handleFavorite}
      >
        {
          favorite ?
          <Icon>star</Icon> :
          <Icon>star_border</Icon>
        }
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
