import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SortMovies = ({ sortCriteria, setSortCriteria }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Sort</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={sortCriteria}
        label="Sort"
        onChange={(event) => setSortCriteria(event.target.value)}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="title">Title (A - Z)</MenuItem>
        <MenuItem value="releaseDate">Release Date (Newest First)</MenuItem>
        <MenuItem value="rating">Rating (High - Low)</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortMovies