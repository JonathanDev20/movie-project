import React from 'react'
import { Grid, Typography } from '@mui/material'
import MySidebar from './Sidebar'
import SearchField from './SearchField'

const Discover = () => {
  return (
    <Grid container>
      <Grid md={12}>
        <div>
          <Grid container>
            <Grid item md={2}>
              <MySidebar />
            </Grid>
            <Grid item md={10}>
              <SearchField />
              <Typography my={4} variant='h4'>Discover</Typography>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default Discover