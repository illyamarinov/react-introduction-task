import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';

import './index.scss';

const ListItem = ({
  title, id, index, isSelected, isFavorite, toggleFavorite, selectItem,
}) => {
  const handleFavorite = (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(index);
  };

  const handleSelect = () => {
    selectItem(index);
  };

  const liClass = classNames(
    'list__item',
    { list__item_selected: isSelected },
  );

  return (
    <div
      onClick={handleSelect}
      className={liClass}
    >
      <label
        className="list__item-label"
        htmlFor={`input-${id}`}
        onClick={handleFavorite}
      >
        {
      isFavorite
        ? <Icon className="list__item-icon_full">star</Icon>
        : <Icon className="list__item-icon_outline">star_border</Icon>
    }
        <input
          className="list__item-button"
          id={`input-${id}`}
          type="checkbox"
          defaultChecked={false}
        />
      </label>

      <p className="list__item-content">
        {`${id}. ${title}`}
      </p>
    </div>
  );
};

ListItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool,
  isSelected: PropTypes.bool,
  toggleFavorite: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  title: 'Title',
  isFavorite: false,
  isSelected: false,
};

export default ListItem;
