import { Alert, Snackbar } from '@mui/material';
import React, { SyntheticEvent, useContext, useState } from 'react';
import { UiContext } from '../../../context';

export const CustomToast = () => {
  const { alertMessageState, handleAlertMessage } = useContext(UiContext);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    handleAlertMessage({ ...alertMessageState, displayAlert: false });
  };
  return (
    <Snackbar 
      open={alertMessageState?.displayAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={2000} 
      onClose={handleClose}>
      <Alert 
        onClose={handleClose} 
        severity={alertMessageState?.severity}
        sx={{ width: '100%' }}>
        { alertMessageState?.alertMessage }
      </Alert>
    </Snackbar>
  );
};
