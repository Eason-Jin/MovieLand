import { useEffect, useState } from "react";

import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

// Use OMDB API to fetch movies
const API_URL = "https://www.omdbapi.com?apikey=ca7557b4";

const movie = {
  Title: "Spiderman",
  Year: "2012",
  imdbID: "tt2084949",
  Type: "movie",
  Poster: "N/A",
};
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to search a movie by title
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    // searchMovies();
  }, [searchTerm]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  // DIV is for blocks, SPAN is for inline elements
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for Movies"
          alt="movieSearch"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        // Check if movie exists
        <div className="container">
          {movies.map((movie) => (
            <div>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
