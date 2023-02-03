import React from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import useFetch from './useFetch'
import Movie from './Movie'

const SearchPage = () => {
  const { searchWord } = useParams()
  const [searchData, isLoadingSearch, searchError] = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchWord}`)

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
                        <Movie movie={movie} />
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