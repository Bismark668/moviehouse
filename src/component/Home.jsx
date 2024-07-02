import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { useEffect } from 'react';
import logo from '../assets/logo.png'
import { MovieCard } from './MovieCard';
import './Home.css'

const API_URL = 'http://www.omdbapi.com/?apikey=c032e2d7&'



export const Home = () => {
  const [movies,setMovies] = useState([])
  const [searchMovies, setsearchMovies] = useState('')


  const searchNewMovie = async(title) => {
    const response = await fetch(`${API_URL}&S=${title}`)
    const data = await response.json()

    setMovies(data.Search)
  }

  useEffect(() => {
    searchNewMovie('Rambo')
  },[])

  const movie1={
    "Title": "The Lord of the Rings: The Battle for Middle-earth II - The Rise of the Witch-king",
    "Year": "2006",
    "imdbID": "tt1058040",
    "Type": "game",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjYwMDIxNjg3MV5BMl5BanBnXkFtZTgwMTk5MTE4MDE@._V1_SX300.jpg"
}
  return (
    <div className="home-div">
      <div className="nav-bar">
        <div className="logo"><img src={logo} alt="logo" /></div>
        <div className="serac-bar"><input  type="text" value={searchMovies} id='search' placeholder='Search All Movies' onChange={(e) =>setsearchMovies(e.target.value)}/>
        <IoMdSearch className='icon' onClick={()=> searchNewMovie(searchMovies)}/></div>
      </div>

      {
        movies?.length > 0
          ?(
            <div className="content">
              { movies.map((movie) => (
                <MovieCard movie={movie} />
              ))}
            </div>
          ) : (
              <div className="nomovies">
                <h2>No Movies Found</h2>
              </div>
          )
      }
    </div>
  )
}
