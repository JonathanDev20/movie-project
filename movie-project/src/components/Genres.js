import React, { useState } from 'react'
import { Button } from '@mui/material'

const Genres = ({ setCategory, category, genre }) => {
  const [activeGenre, setActiveGenre] = useState(false)

  const handleGenreButton = (e) => {
    setCategory(e.target.name)
    setActiveGenre(!activeGenre)
  }

  return (
    <Button color='warning' name={genre.id} onClick={(e) => handleGenreButton(e)} sx={{ margin: '4px' }} variant={activeGenre ? 'contained' : 'outlined'}>{genre.name}</Button>
  )
}

export default Genres