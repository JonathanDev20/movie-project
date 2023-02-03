import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button, ButtonGroup } from '@mui/material'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import useFetch from './useFetch'
import axios from 'axios'
import '../App.css'
import Movie from './Movie'

const Discover = () => {
  const [genres, isLoadingGenres, genresError] = useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
  const [category, setCategory] = useState(28)
  const [movies, setMovies] = useState([])
  const imageUrl = 'https://image.tmdb.org/t/p/original'

  useEffect(() => {
    async function getMoviesByGenre() {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${category} `)
      setMovies(response.data.results)
      console.log(response.data.results)
    }
    getMoviesByGenre()
  }, [category])

  const handleGenreButton = (e) => {
    setCategory(e.target.name)
  }

  return (
    <Grid container>
      <Grid md={12}>
        <div>
          <Grid container>
            <Grid item md={2}>
              <MySidebar />
            </Grid>
            <Grid item md={10}>
              <SearchField />
              <Typography my={4} variant='h4'>Discover</Typography>
              {genresError && <div>{genresError}</div>}
              {isLoadingGenres ? <p>Loading...</p> : (
                genres.genres.map((genre) => (
                  <Button color='warning' name={genre.id} onClick={(e) => handleGenreButton(e)} sx={{ margin: '4px' }} variant='outlined'>{genre.name}</Button>
                )))}
              <Grid container my={4} spacing={2}>
                {movies.map((movie) => (
                  <Movie movie={movie} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default Discover