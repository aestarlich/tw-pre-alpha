import { NextPage } from 'next';
import { MainLayout } from '../../layouts';

import { Box, capitalize, Chip, Grid, Typography } from '@mui/material';
import Image from 'mui-image';

import { useGetDetail } from '../../../hooks';
import { useRouter } from 'next/router';
import { IExercise } from '../../../interfaces';
import { FullScreenLoading } from '../../components/ui';

interface ExerciseLoaded { item: IExercise, isLoading: boolean }

const ExercisePage: NextPage = () => {
  const { query } = useRouter();
  const { item, isLoading } = useGetDetail("/exercises", query.id as string) as ExerciseLoaded;

  return (
    <MainLayout title={capitalize(item?.name || "Loading")} pageDescription={capitalize(item?.name|| "Loading")}>

      {
        !isLoading && item ? (
          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <Image
                src={item?.gifUrl}
                alt={item?.name}
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
                <Chip
                  color="primary"
                  label={item?.equipment?.name || ''}
                  sx={{ position: 'static', marginBottom: '15px', width: 'fit-content' }}
                />
                <Typography variant='h1' component='h1'>{capitalize(item?.name)}</Typography>
                <Box display="flex">
                  <Typography fontWeight={300} sx={{ mr: 1 }}>{capitalize(item?.target?.name)}</Typography>
                  <Typography fontWeight={300}>({capitalize(item?.target?.bodyGroup?.name)})</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )
        :
        <FullScreenLoading/>
      }
    </MainLayout>
  );
};



export default ExercisePage;