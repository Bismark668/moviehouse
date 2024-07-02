import React from 'react'

export const MovieCard = ({ movie}) => {
  return (
    <div className="movies">
      <div className="">
        <p>{movie.Year}</p>
        <div className='movies-data'>
            <span>{movie.Type}</span>
             <h4>{movie.Title}</h4>
         </div>
        </div>

        <div className="movie-img">
             <img src={movie.Poster !== 'N/A'? movie.Poster:'http://via.placeholder.com/400' } alt={movie.Title} />
        </div>
    </div>
  )
}
