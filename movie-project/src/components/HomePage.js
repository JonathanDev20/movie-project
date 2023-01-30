import React, { useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useFetch from './useFetch'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import '../App.css'


const HomePage = () => {
  const [trendingData, isLoadingTrending, trendingError] = useFetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
  const [nowPlayingData, isLoading, error] = useFetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`)
  const [topRatedData, topRLoading, topRError] = useFetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`)
  const imageUrl = 'https://image.tmdb.org/t/p/original'

  console.log(nowPlayingData.results)
  return (
    <>
      {trendingError && <div>{trendingError}</div>}
      {isLoadingTrending ? (
        <p>Loading...</p>
      ) : (
        <Grid container>
          <Grid md={12}>
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
                        <img src={`${imageUrl}/${trendingData.results[0].backdrop_path}`} alt="image1" style={{ height: 'auto', width: '100%', borderRadius: '10px' }} />
                        <div className='imageText'>{trendingData.results[0].title}</div>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className='trending'>
                        <img src={`${imageUrl}/${trendingData.results[1].backdrop_path}`} alt="image2" style={{ height: 'auto', width: '100%', borderRadius: '10px' }} />
                        <div className='imageText'>{trendingData.results[1].title}</div>
                      </div>
                    </Grid>
                  </Grid>
                  <Typography variant='h4'>Now Playing</Typography>
                  <Grid container my={4} spacing={2}>
                    {error && <div>{error}</div>}
                    {isLoading ? <p>Loading...</p> : (
                      nowPlayingData.results.map((movie) => (
                        <Grid item xs={6} md={2}>
                          <div className='imgContainer'>
                            <img src={`${imageUrl}/${movie.poster_path}`} alt={`${movie.title}`} className='movieImg' style={{ height: 'auto', width: '100%', borderRadius: '5px' }} />
                            <div className='middle'>
                              <Typography className='textOnImg' variant='h5'>{movie.title}</Typography>
                              <Typography className='textOnImg' variant='h9'>{movie.release_date.split('-')[0]}</Typography>
                            </div>
                          </div>
                        </Grid>
                      ))
                    )}
                  </Grid>
                  <Typography variant='h4'>Top Rated</Typography>
                  <Grid container my={4} spacing={2}>
                    {topRError && <div>{topRError}</div>}
                    {topRLoading ? <p>Loading...</p> : (
                      topRatedData.results.map((movie) => (
                        <Grid item xs={6} md={2}>
                          <div className='imgContainer'>
                            <img src={`${imageUrl}/${movie.poster_path}`} alt={`${movie.title}`} className='movieImg' style={{ height: 'auto', width: '100%', borderRadius: '5px' }} />
                            <div className='middle'>
                              <Typography className='textOnImg' variant='h5'>{movie.title}</Typography>
                              <Typography className='textOnImg' variant='h9'>{movie.release_date.split('-')[0]}</Typography>
                            </div>
                          </div>
                        </Grid>
                      ))
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default HomePage