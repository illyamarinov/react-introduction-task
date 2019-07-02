import React from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';

import './index.scss';

function ListItem({ listItems, setFavorite, selectItem }) {
  const showItems = () => listItems.map((item, index) => {
    const {
      title, id, selected, favorite,
    } = item;

    const handleFavorite = (e) => {
      e.stopPropagation();
      e.preventDefault();
      setFavorite(index);
    };

    const handleSelect = () => {
      selectItem(index);
    };

    const liClass = classNames(
      'list__item',
      { list__item_selected: selected },
    );

    return (
      <div
        onClick={handleSelect}
        className={liClass}
        key={id}
      >
        <label
          className="list__item-label"
          htmlFor={`input-${id}`}
          onClick={handleFavorite}
        >
          {
            favorite
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
  });
  return (
    <FlipMove
      typeName="div"
      className="list"
      duration="1000"
    >
      {showItems()}
    </FlipMove>
  );
}

ListItem.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFavorite: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

export default ListItem;
