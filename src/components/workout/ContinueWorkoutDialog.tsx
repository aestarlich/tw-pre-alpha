import { BoltOutlined, CloseOutlined, InputOutlined, SaveOutlined } from '@mui/icons-material'
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { UiContext } from '../../../context'
import { WorkoutContext } from '../../../context/workout'
import { CustomButton } from '../ui'

export const ContinueWorkoutDialog = () => {
  const { openContinueWorkoutDialog, handleContinueWorkoutDialog, clearWorkout, id } = useContext(WorkoutContext);
  const { alertMessageState, handleAlertMessage } = useContext(UiContext);
  const { push } = useRouter();

  const clearWorkoutAndExit = () => {
    clearWorkout();
    handleAlertMessage({ alertMessage: 'Workout finished without saving', displayAlert: true, severity: "success" })
    handleContinueWorkoutDialog(false);
  }

  const continueWorkout = () => {
    push(`/workout/${id}`)
    handleContinueWorkoutDialog(false);
  }

  return (
    <Dialog open={openContinueWorkoutDialog} onClose={() => handleContinueWorkoutDialog(false)}>
      <DialogTitle>You have a Workout in progress</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We have detected that you have a training in progress, do you want to continue it?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, width: '100%' }}>
        <Box display="flex" justifyContent="end" gap={2}>
          <CustomButton text='Continue workout' color='success' variant='contained' handleClick={continueWorkout} icon={<BoltOutlined />} />
          <CustomButton text='Drop workout' color='info' variant='outlined' handleClick={clearWorkoutAndExit} icon={<CloseOutlined />} />
        </Box>
      </DialogActions>
    </Dialog >
  )
}
