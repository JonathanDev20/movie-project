import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import MySidebar from './Sidebar'
import SearchField from './SearchField'
import useFetch from './useFetch'
import Movie from './Movie'
import SortMovies from './SortMovies'

const SearchPage = () => {
  const { searchWord } = useParams()
  const [sortCriteria, setSortCriteria] = useState('')
  const [sortedData, setSortedData] = useState([])
  const [searchData, isLoadingSearch, searchError] = useFetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchWord}`)

  useEffect(() => {
    if (!isLoadingSearch && searchError === null) {
      const sortedMovies = [...searchData.results].sort((a, b) => {
        if (sortCriteria === 'title') {
          return a.title.localeCompare(b.title)
        } else if (sortCriteria === 'releaseDate') {
          return new Date(b.release_date) - new Date(a.release_date)
        } else if (sortCriteria === 'rating') {
          return b.vote_average - a.vote_average
        } else {
          return searchData
        }
      })
      setSortedData(sortedMovies)
    }
  }, [sortCriteria, searchData, isLoadingSearch, searchError])

  return (
    <>
      {searchError && <div>{searchError}</div>}
      {isLoadingSearch ? (
        <p>Loading...</p>
      ) : (
      <Grid container>
        <Grid item md={12}>
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
                    sortedData.length === 0 ? <Grid item md={12}><div>Sorry, no results found for '{searchWord}'... Please try a different search term.</div></Grid> : (
                      <>
                        <Grid item xs={12} md={12}>
                          <SortMovies sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
                        </Grid>
                        {sortedData.map((movie) => (
                          <Movie key={movie.id} movie={movie} />
                        ))}
                      </>
                    )
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

export default SearchPage