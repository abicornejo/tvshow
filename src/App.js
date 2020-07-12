import React from 'react';
import Filter from './components/Filter';
import List from './components/List';
import './App.css';

const App = () => {

  return (
      <div className="container">
        <Filter />
        <List />
      </div>
  );
}

export default App;
