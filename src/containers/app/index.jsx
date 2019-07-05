import React, { useState } from 'react';

import List from 'containers/list';
import Header from 'components/header';

import './index.scss';

const App = () => {
  const [list, setList] = useState([]);
  const [chunks, setChunks] = useState([]);

  const handleListChange = (listChanges) => {
    setList(listChanges);
  };

  const handleChunksChange = (chunksChanges) => {
    setChunks(chunksChanges);
  };

  return (
    <div className="app">
      <Header
        onChunksChange={handleChunksChange}
        chunks={chunks}
      />
      <div className="app-content">
        <List
          onListChange={handleListChange}
          onChunksChange={handleChunksChange}
          list={list}
          chunks={chunks}
        />
      </div>
    </div>
  );
};

export default App;
