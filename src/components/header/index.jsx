import React from 'react';
import PropTypes from 'prop-types';

import Control from 'components/control';

import resetAll from 'utils/reset-all';
import sortChunks from 'utils/sort-chunks';
import unsetSelectedFavorite from 'utils/unset-selected-favorite';
import setSelectedFavorite from 'utils/set-selected-favorite';

import './index.scss';

const Header = ({ chunks, changeState }) => {
  const handleSetSelectedFavorite = () => {
    setSelectedFavorite(chunks, sortChunks, changeState);
  };

  const handleUnsetSelectedFavorite = () => {
    unsetSelectedFavorite(chunks, sortChunks, changeState);
  };

  const handleReset = () => {
    resetAll(chunks, changeState);
  };

  return (
    <header className="app-header">
      <h1 className="app-header__title">React Introduction Task</h1>
      <div className="app-navbar">
        <Control
          text="Favorite"
          controlType={handleSetSelectedFavorite}
        />
        <Control
          text="Unfavorite"
          controlType={handleUnsetSelectedFavorite}
        />
        <Control
          text="Reset"
          controlType={handleReset}
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  chunks: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeState: PropTypes.func.isRequired,
};


export default Header;
