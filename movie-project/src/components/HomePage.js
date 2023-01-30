import React, { useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useFetch from './useFetch'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import '../App.css'


const HomePage = () => {
  const [responseData, isLoading, error] = useFetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
  const imageUrl = 'https://image.tmdb.org/t/p/original'

  console.log(responseData.results)
  return (
    <>
      {error && <div>{error}</div>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Grid container>
            <Grid item md={2}>
              <MySidebar />
            </Grid>
            <Grid item md={10}>
              <SearchField />
              <Typography my={4} variant='h4'>Trending</Typography>
              <Grid container spacing={4}>
                <Grid item md={6}>
                  <div className='trending'>
                    <img src={`${imageUrl}/${responseData.results[0].backdrop_path}`} alt="image1" style={{ height: 'auto', width: '100%' }} />
                    <div className='imageText'>{responseData.results[0].title}</div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className='trending'>
                    <img src={`${imageUrl}/${responseData.results[1].backdrop_path}`} alt="image2" style={{ height: 'auto', width: '100%' }} />
                    <div className='imageText'>{responseData.results[1].title}</div>
                  </div>
                </Grid>
              </Grid>
              <Typography variant='h4'>Now Playing</Typography>
              <Grid container my={4} spacing={2}>
                <Grid item md={2}>
                  <img src={`${imageUrl}/${responseData.results[0].poster_path}`} alt="image1" style={{ height: 'auto', width: '100%' }} />
                </Grid>
                <Grid item md={2}>
                  <img src={`${imageUrl}/${responseData.results[1].poster_path}`} alt="image2" style={{ height: 'auto', width: '100%' }} />
                </Grid>
                <Grid item md={2}>
                  <img src={`${imageUrl}/${responseData.results[0].poster_path}`} alt="image1" style={{ height: 'auto', width: '100%' }} />
                </Grid>
                <Grid item md={2}>
                  <img src={`${imageUrl}/${responseData.results[1].poster_path}`} alt="image2" style={{ height: 'auto', width: '100%' }} />
                </Grid>
                <Grid item md={2}>
                  <img src={`${imageUrl}/${responseData.results[0].poster_path}`} alt="image2" style={{ height: 'auto', width: '100%' }} />
                </Grid>
                <Grid item md={2}>
                  <img src={`${imageUrl}/${responseData.results[1].poster_path}`} alt="image2" style={{ height: 'auto', width: '100%' }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  )
}

export default HomePage