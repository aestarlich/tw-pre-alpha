import React, { useContext } from 'react';
import { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { GET_ROUTINE_LIST } from '../../../axiosApi';
import { useLoadingRoutines } from '../../../hooks';
import { CustomButton, FullScreenLoading } from '../../components/ui';
import { MainLayout } from '../../layouts';
import { RoutineGrid } from '../../components/routines';
import { FitnessCenterOutlined } from '@mui/icons-material';
import { RoutineContext } from '../../../context/routine';
import { IRoutine } from '../../../interfaces';
import { AuthContext } from '../../../context/auth';

const RoutinesPage: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { items, totalCount, isLoading } = useLoadingRoutines(GET_ROUTINE_LIST);
  const { handleEditionDialog } = useContext(RoutineContext);

  return (
    <MainLayout title={'TheWorkout - Routines'} pageDescription={''}>
      <Typography variant='h1' component='h1'>My Routines</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All my routines</Typography>

      {
        isLoading && <FullScreenLoading isFull={true} />
      }
      {
        (!isLoading && totalCount > 0) && <RoutineGrid items={items as IRoutine[]} total={totalCount} />
      }
      {
        (!isLoading && totalCount <= 0) && (
          <Box display="flex" flexDirection="column" gap={3} justifyContent="center" alignItems="center" height="calc(100vh - 300px)">
            <Typography variant='h2' component='h2'>{"You don't have any routine yet"}</Typography>
            <CustomButton text='Create Routine' handleClick={() => { handleEditionDialog(true) }} path='/' icon={<FitnessCenterOutlined />} />
          </Box>
        )
      }

    </MainLayout>
  );
};

export default RoutinesPage;