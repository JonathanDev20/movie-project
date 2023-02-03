import React, { useEffect, useState } from 'react'
import { Grid, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import useFetch from './useFetch'
import axios from 'axios'
import '../App.css'
import Movie from './Movie'
import FilterListIcon from '@mui/icons-material/FilterList'


const Discover = () => {
  const [genres, isLoadingGenres, genresError] = useFetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`)
  const [category, setCategory] = useState(28)
  const [movies, setMovies] = useState([])
  const [sortCriteria, setSortCriteria] = useState('')
  const imageUrl = 'https://image.tmdb.org/t/p/original'

  useEffect(() => {
    async function getMoviesByGenre() {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${category} `)
      const sortedMovies = response.data.results.sort((a, b) => {
        if (sortCriteria === 'title') {
          return a.title.localeCompare(b.title)
        } else if (sortCriteria === 'releaseDate') {
          return new Date(b.release_date) - new Date(a.release_date)
        } else if (sortCriteria === 'rating') {
          return b.vote_average - a.vote_average
        } else {
          return response.data.results
        }
      })
      console.log(sortedMovies)
      setMovies(sortedMovies)
    }
    getMoviesByGenre()
  }, [category, sortCriteria])

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
              <Grid my={2}>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Sort</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={sortCriteria}
                      label="Sort"
                      onChange={event => setSortCriteria(event.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="title">Title (A - Z)</MenuItem>
                      <MenuItem value="releaseDate">Release Date (Newest First)</MenuItem>
                      <MenuItem value="rating">Rating (High - Low)</MenuItem>
                    </Select>
                  </FormControl>
              </Grid>
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