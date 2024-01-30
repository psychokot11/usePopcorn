import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import NumResults from "./components/navbar/NumResults";
import Main from "./components/main/Main";
import Box from "./components/box/Box";
import MovieList from "./components/list-box/MovieList";
import WatchedSummary from "./components/watched-box/WatchedSummary";
import WatchedMoviesList from "./components/watched-box/WatchedMoviesList";
import MovieDetails from "./components/watched-box/MovieDetails";
import Loader from "./components/common/Loader";
import ErrorMessage from "./components/common/ErrorMessage";
import { useMovies } from "./custom-hooks/useMovies";
import { useLocalStorageState } from "./custom-hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const KEY = "e58cb9d2"
  
  const closeMovie = () => {
    setSelectedId(null);
  }

  const addWatchedMovie = (movie) => {
    setWatched((watched) => [...watched, movie]);
    closeMovie();
  }

  const deleteWatchedMovie = (id) => {
    setWatched((watched) => watched.filter(movie => movie.imdbID !== id));
  };

  const { movies, isLoading, error } = useMovies(query, closeMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  return (
    <>
      <Navbar query={query} setQuery={setQuery}>
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box 
          element={
            isLoading 
            ? <Loader /> 
            : error 
              ? <ErrorMessage message={error}/>
              : <MovieList 
                  movies={movies} 
                  setSelectedId={setSelectedId} />} />

        <Box
          element={
            selectedId ? ( 
              <MovieDetails 
                apiKey={KEY}
                selectedId={selectedId}
                onAddWatchedMovie={addWatchedMovie}
                onCloseMovie={closeMovie}
                watched={watched}/> 
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList 
                  watched={watched} 
                  deleteWatchedMovie={deleteWatchedMovie}/>
              </>
            )}
        />
      </Main>
    </>
  );
}
