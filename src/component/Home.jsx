import React, { useState, useEffect, useCallback } from "react";
import { IoMdSearch } from "react-icons/io";
import logo from "../assets/logo.png";
import { MovieCard } from "./MovieCard";
import "./Home.css";

const API_URL = "https://www.omdbapi.com/?apikey=c032e2d7";

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setsearchMovies] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchNewMovie = async (title) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
    setIsLoading(false);
  };

  const searchNewMovieDebounced = useCallback(
    debounce((title) => searchNewMovie(title), 500),
    []
  );

  useEffect(() => {
    searchNewMovie("Rambo");
  }, []);

  return (
    <div className="home-div">
      <div className="nav-bar">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="search-bar">
          <input
            type="text"
            value={searchMovies}
            id="search"
            placeholder="Search All Movies"
            onChange={(e) => {
              setsearchMovies(e.target.value);
              searchNewMovieDebounced(e.target.value);
            }}
          />
          <IoMdSearch
            className="icon"
            onClick={() => searchNewMovie(searchMovies)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : movies && movies.length > 0 ? (
        <div className="content">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="nomovies">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};
