import React from 'react'
import { Grid } from '@mui/material'

const Footer = () => {
  return (
    <Grid my={4} container justifyContent={'center'}>
      <div style={{ color: 'grey', textAlign: 'center'}}>
        This product uses the TMDb API but is not endorsed or certified by TMDb
      </div>
    </Grid>
  )
}

export default Footer