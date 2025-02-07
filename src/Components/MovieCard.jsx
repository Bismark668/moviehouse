import React from "react";

export const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="w-72 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={onClick}>
      <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"} alt={movie.Title} className="w-full h-96 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{movie.Title}</h3>
        <p className="text-sm">{movie.Year}</p>
      </div>
    </div>
  );
};
