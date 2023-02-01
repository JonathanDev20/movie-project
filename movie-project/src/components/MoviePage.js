import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography, useMediaQuery, Button } from '@mui/material'
import MySidebar from './Sidebar'
import useFetch from './useFetch'
import YouTube from 'react-youtube'
import '../App.css'

const MoviePage = () => {
  const { id } = useParams()
  const [movieData, isLoadingMovie, movieError] = useFetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
  const [videoData, isLoadingVideo, videoError] = useFetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  const [videoKey, setVideoKey] = useState('')
  const imageUrl = 'https://image.tmdb.org/t/p/original'
  const isSmallScreen = useMediaQuery('(max-width:1000px)')

  console.log(movieData)
  // console.log(videoData)

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
      setVideoKey(trailer[0].key)
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
                      <img src={`${imageUrl}/${isSmallScreen ? movieData.backdrop_path : movieData.poster_path}`} alt={movieData.title} style={{ height: 'auto', width: '70%', borderRadius: '10px' }} />
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant='h4'>{movieData.title}</Typography>
                      <div style={{ marginTop: '20px' }}>
                        {movieData.genres.map((genre) => (
                          <Button sx={{ marginRight: '4px' }} variant='outlined' color='warning'>{genre.name}</Button>
                        ))}
                      </div>
                      <div style={{ marginTop: '20px', marginRight: '5px' }}>
                        {movieData.overview}
                      </div>
                    </Grid>
                    <Grid item md={12}>
                      
                    </Grid>
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