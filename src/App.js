import { useEffect, useState } from "react";
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

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        closeMovie();
        setError("");
        setIsLoading(true);
        const res = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
        {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
        setError("");

      } catch (err) {
        console.log(err.message);
        if (err.name !== "AbortError") { 
          setError(err.message);
        }
        
      } finally {
        setIsLoading(false);
      }
      
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
    return () => {
      controller.abort();
    }

  }, [query]);

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
