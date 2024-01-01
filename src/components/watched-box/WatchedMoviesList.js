import React from 'react';
import WatchedMovie from './WatchedMovie';

function WatchedMoviesList({ watched, deleteWatchedMovie }) {
  return (
    <>
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie 
                  key={movie.imdbID} 
                  movie={movie}
                  deleteWatchedMovie={deleteWatchedMovie} />
            ))}
        </ul>
    </>
  );
};

export default WatchedMoviesList;