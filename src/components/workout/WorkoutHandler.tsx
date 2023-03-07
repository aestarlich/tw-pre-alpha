import React, { FC, useContext } from 'react'
import { Grid, Typography } from '@mui/material';
import { ExerciseType, IWorkoutExerciseDivided } from '../../../interfaces';
import { WorkoutContext } from '../../../context/workout';
import { ExerciseWorkout } from './ExerciseWorkout';
import { TimerWorkout } from './TimerWorkout';

interface Props {
  exercises: IWorkoutExerciseDivided[];
}

export const WorkoutHandler: FC<Props> = ({ exercises }) => {
  const { actualOrder } = useContext(WorkoutContext);

  return (
    <Grid item xs={12}>
      {
        exercises.map((exercise, index) => {
          if(actualOrder === exercise.orderInWorkout && exercise.series.length > 0 && exercise.itemType !== ExerciseType.CARDIO_TYPE) { 
            return <ExerciseWorkout key={exercise.orderInWorkout} exercise={exercise} />
          } else if(
            actualOrder === exercise.orderInWorkout && exercise.itemType === ExerciseType.REST_TYPE ||
            actualOrder === exercise.orderInWorkout && exercise.itemType === ExerciseType.CARDIO_TYPE
          ) {
            return <TimerWorkout key={exercise.orderInWorkout} exercise={exercise} />
          }
        })
      }
    </Grid>
  )
}
