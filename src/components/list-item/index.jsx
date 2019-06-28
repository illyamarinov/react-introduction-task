import React from 'react';
import PropTypes from 'prop-types';

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
      className={`list__item${selected ? ' list__item_selected' : ''}`}
      onClick={handleSelect}
    >
      <label
        className="list__item-label"
        htmlFor={`input-${id}`}
        onClick={handleFavorite}
      >
        {
          favorite ?
          <Icon className="list__item-icon_full">star</Icon> :
          <Icon className="list__item-icon_outline">star_border</Icon>
        }
      </label>

      <input
        className="list__item-button"
        id={`input-${id}`}
        type="checkbox"
        defaultChecked={false}
      />

      <p className="list__item-content">
        {id}. {title}
      </p>
    </li>
  )
}

ListItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  index: PropTypes.number,
  favorite: PropTypes.bool,
  selected: PropTypes.bool,
  setFavorite: PropTypes.func,
  selectItem: PropTypes.func
}

export default ListItem;
