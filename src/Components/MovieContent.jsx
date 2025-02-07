import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://www.omdbapi.com/?apikey=c032e2d7";

export const MovieContent = () => {
  const { id } = useParams(); // Get movie ID from URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}&i=${id}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setIsLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) return <div className="text-white text-xl font-semibold">Loading...</div>;
  if (!movie) return <div className="text-white text-xl font-semibold">Movie not found</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#0C121A] text-white p-6">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-6 bg-red-500 px-4 py-2 rounded-lg">
        ← Back
      </button>

      {/* Movie Details */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        {/* Movie Poster */}
        <div className="w-full md:w-1/3">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
            alt={movie.Title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Movie Information */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold">{movie.Title} ({movie.Year})</h2>
          <p className="mt-2"><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mt-2"><strong>Plot:</strong> {movie.Plot}</p>
          <p className="mt-2"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
              <button className="bg-blue-500 px-4 py-2 rounded-lg">Watch on IMDB</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
