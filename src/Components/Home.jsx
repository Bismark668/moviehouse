import React, { useState, useEffect, useCallback } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MovieCard } from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=c032e2d7";

// Default movie categories for random selection
const defaultSearchTerms = ["Marvel", "Action", "Trending", "Latest", "Avengers", "Batman", "Superman"];

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
  const [searchMovies, setSearchMovies] = useState("");
  const navigate = useNavigate();

  const searchNewMovie = async (title) => {
    if (!title.trim()) return; 
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      setMovies(data.Response === "True" ? data.Search : []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  // Debounce search function to prevent frequent API calls
  const debouncedSearch = useCallback(debounce(searchNewMovie, 500), []);

  // Fetch random movies on page load
  useEffect(() => {
    const randomCategory = defaultSearchTerms[Math.floor(Math.random() * defaultSearchTerms.length)];
    searchNewMovie(randomCategory);
  }, []);

  // Run search when typing
  useEffect(() => {
    if (searchMovies) {
      debouncedSearch(searchMovies);
    }
  }, [searchMovies, debouncedSearch]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#0C121A] p-4">
      {/* Navbar */}
      <div className="w-[90%] mb-4 p-2 h-[20vh] flex flex-col items-center justify-center gap-2">
        {/* Logo */}
        <div className="w-[50%] h-full">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>
        
        {/* Search Bar */}
        <div className="w-[90%] flex items-center bg-gray-300 p-4 rounded-full">
          <input
            type="text"
            value={searchMovies}
            placeholder="Search All Movies"
            onChange={(e) => setSearchMovies(e.target.value)}
            className="w-[90%] bg-transparent outline-none border-none text-black text-2xl px-2"
          />
          <IoMdSearch className="text-4xl cursor-pointer hover:text-blue-500 hover:scale-125 transition-all duration-300" />
        </div>
      </div>

      {/* Movie List */}
      <div className="w-full bg-red-300 flex flex-wrap md:justify-start justify-center gap-12 pt-2 md:p-2 cursor-pointer">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            />
          ))
        ) : (
          <div className="text-2xl font-bold text-white">No Movies Found</div>
        )}
      </div>
    </div>
  );
};
