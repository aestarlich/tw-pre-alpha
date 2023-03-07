import { NextPage } from 'next'
import { ArrowForwardIosOutlined } from '@mui/icons-material'
import { Box, Button, capitalize, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { UiContext } from '../../../context'
import { WorkoutContext } from '../../../context/workout'
import { useGetDetail } from '../../../hooks'
import { IRoutine } from '../../../interfaces'
import { timerEnds } from '../../../utils'
import { ProgressBar, WorkoutHandler } from '../../components/workout'
import { WorkoutLayout } from '../../layouts'
import { FullScreenLoading } from '../../components/ui'

interface WorkoutLoaded { item: IRoutine, isLoading: boolean }

const WorkoutPage: NextPage = () => {
  const { query } = useRouter();
  const { item: routineExercises, isLoading } = useGetDetail("/workout", query.id as string) as WorkoutLoaded;
  const { startWorkout, workout, percentage, actualOrder, updateWorkout, finishWorkout } = useContext(WorkoutContext);
  const { handleAlertMessage } = useContext(UiContext);
  const { push } = useRouter();
  useEffect(() => {
    if(routineExercises) startWorkout(routineExercises)
  }, [routineExercises]);

  useEffect(() => {
  }, [percentage])
  

  const nextExercise = () => {
    timerEnds.handle(false);
    updateWorkout()
  }

  const saveWorkoutAndExit = async () => {
    push('/');
    const saveResp = await finishWorkout();
    if (saveResp?.status && saveResp?.status !== 200) {
      handleAlertMessage({ alertMessage: "Error saving workout", displayAlert: true, severity: "error" });
      return;
    }
    handleAlertMessage({ alertMessage: 'Workout saved', displayAlert: true, severity: "success" })
  }

  return (
    <WorkoutLayout title={'Workout'} pageDescription={''}>
      {
        !isLoading ? (
          <Grid container
            height={'calc(100vh - 70px)'}
            display="flex"
            // position='absolute'
            maxWidth={'calc(100vw - 60px)'}
            width="100%"
            justifyContent="space-between"
            alignItems="stretch"
            flexDirection="row"
            sx={{
              // flexDirection: { xs: 'column', lg: 'row' },
              position: { xs: 'absolute', md: 'relative' },
              margin: 'auto'
            }}>
            <WorkoutHandler exercises={workout} />
            <Box flex={1} />
            {
              workout[actualOrder] !== undefined ?
                <Grid item xs={12} alignSelf="flex-end">
                  <Typography mb={2}>
                    Next exercise: {capitalize(workout[actualOrder].name)}
                  </Typography>
                  <ProgressBar value={percentage} />
                  <Button onClick={nextExercise} endIcon={<ArrowForwardIosOutlined />} fullWidth sx={{ py: 2, mt: 2 }} >
                    <Typography fontWeight={800}>
                      Next
                    </Typography>
                  </Button>
                </Grid>
                :
                <Grid item xs={12} alignSelf="flex-end">
                  <ProgressBar value={percentage} />
                  <Button onClick={saveWorkoutAndExit} endIcon={<ArrowForwardIosOutlined />} fullWidth sx={{ py: 2 }} >
                    <Typography fontWeight={800}>
                      Finish Workout
                    </Typography>
                  </Button>
                </Grid>
            }
          </Grid>
        ) :
        (
          <FullScreenLoading />
        )
      }

    </WorkoutLayout>
  )
}
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { id = '' } = params as { id: string };
//   const routineExercises = await dbRoutines.getRoutineDetail(undefined, undefined, id) as IRoutine;
//   if(routineExercises.training && routineExercises.training.length <= 0) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/routines",
//       },
//       props:{},
//     };
//   }

//   return {
//     props: {
//       routineExercises
//     }
//   }
// }

export default WorkoutPage