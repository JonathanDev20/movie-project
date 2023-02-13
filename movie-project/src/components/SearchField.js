import React, { useState } from 'react'
import { Paper, IconButton, InputBase } from '@mui/material'
import Search from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

const SearchField = () => {
  const [searchWord, setSearchWord] = useState('')
  const navigate = useNavigate()

  const handleSubmit = () => {
    if(searchWord !== '') {
      navigate(`/search/${searchWord}`)
    }
  }

  const handleChange = (e) => {
    setSearchWord(e.target.value)
  }

  return (
    <Paper component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 390, mt: 2 }} onSubmit={(e) => e.preventDefault()}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search movie titles"
        inputProps={{ 'aria-label': 'Search movie titles' }}
        onChange={(e) => handleChange(e)}
      />
      <IconButton onClick={() => handleSubmit()} type="button" sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  )
}

export default SearchField