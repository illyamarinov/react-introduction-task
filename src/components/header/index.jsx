import React from 'react';
import PropTypes from 'prop-types';

import Control from 'components/control';

import resetAll from 'utils/reset-all';
import setSelectedFavorite from 'utils/set-selected-favorite';
import unsetSelectedFavorite from 'utils/unset-selected-favorite';

import './index.scss';

const Header = ({ chunks, onChunksChange }) => {
  const handleSetSelectedFavorite = () => {
    setSelectedFavorite(chunks, onChunksChange);
  };

  const handleUnsetSelectedFavorite = () => {
    unsetSelectedFavorite(chunks, onChunksChange);
  };

  const handleReset = () => {
    resetAll(chunks, onChunksChange);
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
  onChunksChange: PropTypes.func.isRequired,
};

export default Header;
