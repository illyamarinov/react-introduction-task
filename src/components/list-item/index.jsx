import React from 'react';

import './index.scss';

const ListItem = ({title, id, index, favorite, onClick}) => {
  const handleClick = () => {
    onClick(index);
  }

  return (
    <li className={`list-item${favorite ? " selected" : ""}`}>
      <label className="list-item-label">
        <input
          type="checkbox"
          defaultChecked={false}
          className="list-item-button"
          onClick={handleClick}
        />
        <span className="list-item-content">{title}</span>
      </label>
    </li>
  )
}

export default ListItem;
