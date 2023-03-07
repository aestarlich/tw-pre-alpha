import React, { FC, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { RoutineContext } from '../../../context/routine';
import { CustomButton } from '../ui';
import { CloseOutlined, InputOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UiContext } from '../../../context';
import { AuthContext } from '../../../context/auth';

type FormData = {
  name: string
}

export const EditionTrainingDialog: FC = () => {

  const { isDialogOpened, handleEditionDialog, createRoutine, startRoutineEdition, clearRoutineExercises } = useContext(RoutineContext);
  const { handleAlertMessage } = useContext(UiContext);
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: { name: '' }
  });
  const { push } = useRouter();

  const submitForm = async(formData: FormData) => {
    const { name } = formData;
    const { status, data, message } = await createRoutine(name, user!.email);
    startRoutineEdition();
    clearRoutineExercises();
    if(status !== 200) {
      handleAlertMessage({ alertMessage: message, displayAlert: true, severity: "error" });
      return;
    }
    closeDialog();
    handleAlertMessage({ alertMessage: message, displayAlert: true, severity: "success" });
    push(`/routines/edit/${data!._id}`);
  };

  const closeDialog = () => {
    setValue("name", '');
    handleEditionDialog(false);
  };

  return (
    <Dialog onClose={closeDialog} open={isDialogOpened}>
      <DialogTitle>Create your Training Routine</DialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent>
          <DialogContentText>
            To start creating your routine, you only need a name.
          </DialogContentText>

          <TextField
            autoFocus={ true }
            margin="dense"
            id="name"
            label="Your training routine name"
            type="text"
            fullWidth
            required
            variant="outlined"
            {...register('name', {
              required: 'This field is required'
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <CustomButton text='Cancel' color='error' variant='outlined' handleClick={closeDialog} icon={<CloseOutlined />} />
          <Box flex={1} sx={{ display: { xs: 'none', md: 'flex' } }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <CustomButton text='Create routine and continue' handleClick={handleSubmit(submitForm)} icon={<InputOutlined />} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <CustomButton text='Create' handleClick={handleSubmit(submitForm)} icon={<InputOutlined />} />
          </Box>
        </DialogActions>
      </form>

    </Dialog >
  );
};
