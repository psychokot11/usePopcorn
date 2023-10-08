import React from 'react';
import ListBox from '../list-box/ListBox';
import WatchedBox from '../watched-box/WatchedBox';

function Main({ tempWatchedData, movies }) {
  return (
    <>
      <main className="main">
        <ListBox movies={movies} />
        <WatchedBox tempWatchedData={tempWatchedData} />
      </main>
    </>
  );
};

export default Main;