import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material'
import useFetch from './useFetch'

const CustomDialog = ({ credit }) => {
  const imageUrl = 'https://image.tmdb.org/t/p/original'
  const [personData, isLoading, error] = useFetch(`https://api.themoviedb.org/3/person/${credit.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
  const [open, setOpen] = useState(false)

  const calculateAge = (birthDate) => {
    if (birthDate === null) {
      return 'unknown'
    } else {
      const birth = new Date(birthDate)
      const current = new Date()
      const diff = current - birth
      return Math.floor(diff/31557600000) // Divide by 1000*60*60*24*365.25
    }
  }

  console.log(personData)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button sx={{ margin: '2px' }} onClick={handleClickOpen} variant='outlined'>{credit.character === '' ? `"${credit.name}"` : credit.character}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container>
          <Grid item xs={12} md={4}>
            <img style={{ height: 'auto', width: '100%' }} src={credit.profile_path === null ? './img/posterplaceholder.jpg' : `${imageUrl}${credit.profile_path}`} alt="credit" />
          </Grid>
          <Grid item xs={12} md={8}>
              <Grid item xs={10} md={10}>
                <DialogTitle id="alert-dialog-title">
                  {credit.character === '' ? `"${credit.name}"` : credit.character}
                </DialogTitle>
              <Grid item xs={12} md={12}>
                <DialogContent>
                  <DialogContentText sx={{ marginBottom: '10px' }} id="alert-dialog-description">
                    Actor: {credit.name}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description">
                    Age: {calculateAge(personData.birthday)}
                  </DialogContentText>
                </DialogContent>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default CustomDialog