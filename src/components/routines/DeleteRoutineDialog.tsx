import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { gymApi } from '../../../axiosApi';
import { RoutineContext } from '../../../context/routine';


interface Props {
  id: string,
  name: string,
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

export const DeleteRoutineDialog: FC<Props> = ({ id, name, openDialog, setOpenDialog }) => {
  const [open, setOpen] = useState(false);
  const { clearRoutineExercises } = useContext(RoutineContext);
  const {reload} = useRouter();
  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog])
  
  const handleClose = () => {
    setOpen(false);
    setOpenDialog(false);
  };

  const deleteRoutine = () => {
    clearRoutineExercises();
    gymApi.delete(`/routines/${id}`);
    reload();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to delete { name }?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        If you delete the routine { name }, you will not be able to recover it.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Disagree</Button>
        <Button onClick={deleteRoutine} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
