import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { FullScreenLoading } from '../../components/ui';
import { ExerciseGrid } from '../../components/exercises';
import { MainLayout } from '../../layouts';
import { useLoadingExercises } from '../../../hooks';
import { GET_EXERCISE_LIST } from '../../../axiosApi';
import { useState } from 'react';
import { defaultParams, IExercise, IParams } from '../../../interfaces';

const ExercisesPage: NextPage = () => {
  const [params, setParams] = useState<IParams>(defaultParams);
  const { items, totalCount, isLoading } = useLoadingExercises(GET_EXERCISE_LIST, params);

  return (
    <MainLayout title={'TheWorkout - All Exercises'} pageDescription={'Get all exercises of TheWorkout'}>
      <Typography variant='h1' component='h1'>TheWorkout</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All exercises</Typography>

      {
        isLoading
          ? <FullScreenLoading isFull={true} />
          : <ExerciseGrid items={items as IExercise[]} total={totalCount} handleLoad={() => setParams({ ...params, offset: items.length })} />
      }
    </MainLayout>
  );
};

export default ExercisesPage;