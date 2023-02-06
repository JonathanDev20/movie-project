import React, { useEffect } from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useFetch from './useFetch'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import '../App.css'
import { Link } from 'react-router-dom'
import Movie from './Movie'
import Footer from './Footer'

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
                      <Link to={`/movie/${trendingData.results[0].id}`}>
                        <div className='trending'>
                          <img src={`${imageUrl}/${trendingData.results[0].backdrop_path}`} alt={trendingData.results[0].title} style={{ height: 'auto', width: '100%', borderRadius: '10px' }} />
                          <div className='imageText'><p>{trendingData.results[0].title}</p></div>
                        </div>
                      </Link>
                    </Grid>
                    <Grid item md={6}>
                      <Link to={`/movie/${trendingData.results[1].id}`}>
                        <div className='trending'>
                          <img src={`${imageUrl}/${trendingData.results[1].backdrop_path}`} alt={trendingData.results[1].title} style={{ height: 'auto', width: '100%', borderRadius: '10px' }} />
                          <div className='imageText'><p>{trendingData.results[1].title}</p></div>
                        </div>
                      </Link>
                    </Grid>
                  </Grid>
                  <Typography variant='h4'>Now Playing</Typography>
                  <Grid container my={4} spacing={2}>
                    {error && <div>{error}</div>}
                    {isLoading ? <p>Loading...</p> : (
                      nowPlayingData.results.map((movie) => (
                        <Movie movie={movie} />
                      ))
                    )}
                  </Grid>
                  <Typography variant='h4'>Top Rated</Typography>
                  <Grid container my={4} spacing={2}>
                    {topRError && <div>{topRError}</div>}
                    {topRLoading ? <p>Loading...</p> : (
                      topRatedData.results.map((movie) => (
                        <Movie movie={movie} />
                      ))
                    )}
                  </Grid>
                  <Footer />
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