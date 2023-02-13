import React from 'react'
import '../App.css'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'


const Movie = ({ movie }) => {
  const imageUrl = 'https://image.tmdb.org/t/p/original'
  return (
    <Grid item xs={6} md={2}>
      <div className='imgContainer'>
        <Link to={`/movie/${movie.id}`}>
          <img src={movie.poster_path === null ? './img/posterplaceholder.jpg' : `${imageUrl}/${movie.poster_path}`} alt={`${movie.title}`} className='movieImg' style={{ height: 'auto', width: '100%', borderRadius: '5px' }} />
          <div className='middle'>
            <Typography className='textOnImg' variant='h5'>{movie.title}</Typography>
            <Typography className='textOnImg' variant='h9'>{movie.release_date.split('-')[0]}</Typography>
          </div>
        </Link>
      </div>
    </Grid>
  )
}

export default Movie