import React, { useRef, useEffect } from 'react';

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(() => {
    const focusOnInputEl = () => {
      inputEl.current.focus();
    }

    focusOnInputEl();

    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;

      if (e.key === "Enter") {
        focusOnInputEl();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback)
  }, [setQuery])

  return (
    <>
      <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputEl}
        />
    </>
  );
};

export default Search;