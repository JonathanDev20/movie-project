import React from 'react'
import { TextField } from '@mui/material'

const SearchField = () => {
  return (
    <TextField
    label="Search movie titles"
    margin="normal"
    variant="filled"
    sx={{ width: '20rem' }}
  />
  )
}

export default SearchField