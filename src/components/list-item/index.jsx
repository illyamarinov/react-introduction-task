import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';

import './index.scss';

class ListItem extends Component {
  handleFavorite = (e) => {
    const { setFavorite, index } = this.props;
    e.stopPropagation();
    e.preventDefault();
    setFavorite(index);
  };

  handleSelect = () => {
    const { selectItem, index } = this.props;
    selectItem(index);
  };

  render() {
    const {
      title, id, selected, favorite,
    } = this.props;

    const liClass = classNames(
      'list__item',
      { list__item_selected: selected },
    );

    return (
      <div
        onClick={this.handleSelect}
        className={liClass}
      >
        <label
          className="list__item-label"
          htmlFor={`input-${id}`}
          onClick={this.handleFavorite}
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
  }
}

ListItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  favorite: PropTypes.bool,
  selected: PropTypes.bool,
  setFavorite: PropTypes.func.isRequired,
  selectItem: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  title: 'Title',
  favorite: false,
  selected: false,
};

export default ListItem;
