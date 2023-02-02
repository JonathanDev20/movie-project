import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import useFetch from './useFetch'
import { Link } from 'react-router-dom'

const SearchPage = () => {
  const { searchWord } = useParams()
  const [searchData, isLoadingSearch, searchError] = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchWord}`)
  const imageUrl = 'https://image.tmdb.org/t/p/original'

  return (
    <>
      <Grid container>
        <Grid md={12}>
          <div>
            <Grid container>
              <Grid item md={2}>
                <MySidebar />
              </Grid>
              <Grid item md={10}>
                <SearchField />
                <Typography my={4} variant='h4'>Top results</Typography>
                <Grid container my={4} spacing={2}>
                    {searchError && <div>{searchError}</div>}
                    {isLoadingSearch ? <p>Loading...</p> : (
                      searchData.results.map((movie) => (
                        <Grid item xs={6} md={2}>
                          <div className='imgContainer'>
                            <Link to={`/movie/${movie.id}`}>
                              <img src={`${imageUrl}/${movie.poster_path}`} alt={`${movie.title}`} className='movieImg' style={{ height: 'auto', width: '100%', borderRadius: '5px' }} />
                              <div className='middle'>
                                <Typography className='textOnImg' variant='h5'>{movie.title}</Typography>
                                <Typography className='textOnImg' variant='h9'>{movie.release_date.split('-')[0]}</Typography>
                              </div>
                            </Link>
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
    </>
  )
}

export default SearchPage