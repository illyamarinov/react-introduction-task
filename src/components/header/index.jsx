import React from 'react';
import PropTypes from 'prop-types';

import Control from 'components/control';

import './index.scss';

const Header = ({ setSelectedFavorite, unsetSelectedFavorite, resetAll }) => (
  <header className="app-header">
    <h1 className="app-header__title">React Introduction Task</h1>
    <div className="app-navbar">
      <Control
        text="Favorite"
        controlType={setSelectedFavorite}
      />
      <Control
        text="Unfavorite"
        controlType={unsetSelectedFavorite}
      />
      <Control
        text="Reset"
        controlType={resetAll}
      />
    </div>
  </header>
);

Header.propTypes = {
  setSelectedFavorite: PropTypes.func.isRequired,
  unsetSelectedFavorite: PropTypes.func.isRequired,
  resetAll: PropTypes.func.isRequired,
};


export default Header;
