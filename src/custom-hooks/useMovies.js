import { useState, useEffect } from 'react';

const KEY = "e58cb9d2"

export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        const fetchMovies = async () => {
          try {
            callback?.();
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

      return { movies, isLoading, error };
}