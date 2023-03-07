import React, { FC, useContext } from 'react';
import { Box, capitalize, Grid, TextField, Typography } from '@mui/material';
import Image from 'mui-image';
import { ISerieCompleted, IWorkoutExerciseDivided } from '../../../interfaces';
import { Controller, useForm } from 'react-hook-form';
import { WorkoutContext } from '../../../context/workout';

interface Props {
  exercise: IWorkoutExerciseDivided
}

export const ExerciseWorkout: FC<Props> = ({ exercise }) => {
  const { updateExerciseParams } = useContext(WorkoutContext)
  const { getValues, control } = useForm<ISerieCompleted>({
    defaultValues: {
      completedReps: exercise.reps || 10,
      completedWeight: exercise.weight || 10,
    }
  });

  const onValueChange = () => {
    const updatedExercise = {
      ...exercise,
      completedReps: parseInt(getValues('completedReps') as any),
      completedWeight: parseInt(getValues('completedWeight') as any)
    }
    updateExerciseParams(updatedExercise as IWorkoutExerciseDivided);
  }

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={5}>
        <Image
          src={exercise.gifUrl as string}
          alt={exercise.name}
          height="100%"
          width="100%"
          fit="cover"
          easing="ease-in"
          duration={1000}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Box display='flex' flexDirection='column'>

          {/* Data */}
          <Typography variant='h1' component='h1'>{capitalize(exercise.name)}</Typography>

          <Box mt={2}>
            <form style={{ display: "flex", gap: 15, flexDirection: "column" }} onChange={onValueChange}>
              <Box
                fontSize={20}
                display="flex"
                alignItems="center"
                justifyContent="space-between"><b>Reps: </b>
                <Controller
                  control={control}
                  name="completedReps"
                  render={({ field: { onChange, name, ref } }) => (
                    <TextField
                      type="number"
                      variant="standard"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      value={exercise.completedReps || 10}
                      onChange={onChange} />
                  )}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                fontSize={20}><b>Weight: </b>
                <Controller
                  control={control}
                  name="completedWeight"
                  render={({ field: { onChange, name, ref } }) => (
                    <TextField
                      type="number"
                      variant="standard"
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      value={exercise.completedWeight || 10}
                      onChange={onChange} />
                  )}
                />
              </Box>
            </form>
          </Box>
        </Box>
      </Grid>


    </Grid>
  )
}
function getValues(arg0: string): any {
  throw new Error('Function not implemented.');
}

