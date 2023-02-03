import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const CustomDialog = ({ credit }) => {
  const imageUrl = 'https://image.tmdb.org/t/p/original'
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button sx={{ margin: '2px' }} onClick={handleClickOpen} variant='outlined'>{credit.character}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {credit.character}
        </DialogTitle>
        <DialogContent>
          <img style={{ height: 'auto', width: '60%' }} src={credit.profile_path === null ? './img/posterplaceholder.jpg' : `${imageUrl}${credit.profile_path}`} alt="credit" />
          <DialogContentText id="alert-dialog-description">
            {credit.name}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CustomDialog