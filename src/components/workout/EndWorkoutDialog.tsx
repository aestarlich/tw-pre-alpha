import { CloseOutlined, InputOutlined, SaveOutlined } from '@mui/icons-material'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { UiContext } from '../../../context'
import { WorkoutContext } from '../../../context/workout'
import { CustomButton } from '../ui'

export const EndWorkoutDialog = () => {
  const { openFinishWorkoutDialog, handleFinishWorkoutDialog, clearWorkout, finishWorkout } = useContext(WorkoutContext);
  const { alertMessageState, handleAlertMessage } = useContext(UiContext);
  const { push } = useRouter();

  const clearWorkoutAndExit = () => {
    clearWorkout();
    handleAlertMessage({ alertMessage: 'Workout finished without saving', displayAlert: true, severity: "success" })
    push('/');
  }

  const saveWorkoutAndExit = async () => {
    const saveResp = await finishWorkout();
    
    if(saveResp?.status && saveResp?.status !== 200) {
      handleAlertMessage({ alertMessage: "Error saving workout", displayAlert: true, severity: "error" });
      return;
    }
    handleAlertMessage({ alertMessage: 'Workout saved', displayAlert: true, severity: "success" })
    push('/');
  }

  return (
    <Dialog open={openFinishWorkoutDialog} onClose={() => handleFinishWorkoutDialog(false)}>
      <DialogTitle>Finishing your Workout</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          
        </DialogContentText> */}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, width: 'fit-content' }}>
        <Box display="flex" gap={2} sx={{ flexDirection: {xs: 'column'} }}>
          <CustomButton text='Cancel' color='success' variant='contained' handleClick={() => handleFinishWorkoutDialog(false)} icon={<CloseOutlined />} />
          <CustomButton text='Save and exit' color='info' variant='contained' handleClick={saveWorkoutAndExit} icon={<SaveOutlined />} />
          <CustomButton text='Exit without save' color='error' variant='outlined' handleClick={clearWorkoutAndExit} icon={<InputOutlined />} />
        </Box>
      </DialogActions>
    </Dialog >
  )
}
