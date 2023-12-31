import React from 'react';
import Movie from './Movie';

function MovieList({ movies, setSelectedId }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
            <Movie key={movie.imdbID} movie={movie} 
            setSelectedId={setSelectedId} />
        ))}
        </ul>
    </>
  );
};

export default MovieList;