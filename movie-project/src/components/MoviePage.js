import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography, useMediaQuery, Button } from '@mui/material'
import StarRateIcon from '@mui/icons-material/StarRate'
import MySidebar from './Sidebar'
import useFetch from './useFetch'
import YouTube from 'react-youtube'
import '../App.css'
import CustomDialog from './CustomDialog'

const MoviePage = () => {
  const { id } = useParams()
  const [movieData, isLoadingMovie, movieError] = useFetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
  const [videoData, isLoadingVideo, videoError] = useFetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  const [creditsData, isLoadingCredits, creditsError] = useFetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  const [videoKey, setVideoKey] = useState('')
  const imageUrl = 'https://image.tmdb.org/t/p/original'
  const isSmallScreen = useMediaQuery('(max-width:1000px)')

  console.log(creditsData)
  console.log(videoData)

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      playsinline: 1,
    },
  }

  useEffect(() => {
    if (!isLoadingVideo && videoError === null) {
      const trailer = videoData.results.filter((movie) => movie.type === 'Trailer')
      setVideoKey(trailer[0]?.key)
    }

  }, [videoData, isLoadingVideo, videoError])

  return (
    <>
      {movieError && <div>{movieError}</div>}
      {isLoadingMovie ? (
        <p>Loading...</p>
      ) : (
        <Grid container style={{ padding: 0, margin: 0 }}>
          <Grid md={12}>
            <div>
              <Grid container>
                <Grid item md={2}>
                  <MySidebar />
                </Grid>
                <Grid item xs={12} md={10}>
                  <Grid container my={3}>
                    <Grid item xs={12} md={6}>
                      <img src={movieData.poster_path === null ? './img/posterplaceholder.jpg' : `${imageUrl}/${isSmallScreen ? movieData.backdrop_path : movieData.poster_path}`} alt={movieData.title} style={isSmallScreen ? { height: 'auto', width: '100%', borderRadius: '10px' } : { height: 'auto', width: '70%', borderRadius: '10px' }} />
                    </Grid>
                    <Grid item md={6}>
                      <Typography my={2} variant='h4'>{movieData.title}</Typography>
                      <StarRateIcon color='warning' /> {movieData.vote_average.toFixed(1)}
                      <Grid my={2}>
                        <Typography variant='h8'>{movieData.release_date.split('-')[0]}</Typography>
                      </Grid>
                      <div style={{ marginTop: '20px' }}>
                        {movieData.genres.map((genre) => (
                          <Button sx={{ marginRight: '4px' }} variant='outlined' color='warning'>{genre.name}</Button>
                        ))}
                      </div>
                      <div style={{ marginTop: '20px', marginRight: '5px' }}>
                        {movieData.overview}
                      </div>
                    </Grid>
                    {creditsError && <div>{creditsError}</div>}
                    {isLoadingCredits ? (
                      <p>Loading...</p>
                    ) : (
                      <>
                        <Grid container>
                          <Grid item md={12}>
                            <Typography my={4} variant='h4'>Cast</Typography>
                          </Grid>
                          <Grid item md={12}>
                            {creditsData.cast.map((credit) => (
                              <CustomDialog credit={credit} />
                            ))}
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <div>
                    <YouTube
                      videoId={videoKey}
                      opts={opts}
                      style={{ height: '60vh' }}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default MoviePage