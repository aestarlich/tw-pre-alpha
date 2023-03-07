import type { NextPage } from 'next';
import { Grid } from '@mui/material';
import { MainLayout } from '../layouts';
import { IndexCard } from '../components/exercises';

const HomePage: NextPage = () => {
  return (
    <MainLayout title={'TheWorkout'} pageDescription={'TheWorkout'}>
      <Grid container spacing={2}>
        <IndexCard url={'/exercises'} img={'exercises'} title={'Get all exercises'} />
        <IndexCard url={'/routines'} img={'routines'} title={'Go to routines list'} />
        <IndexCard url={'/progress'} img={'progress'} title={'Check my progress'} />
      </Grid>
    </MainLayout>
  );
};

export default HomePage;
