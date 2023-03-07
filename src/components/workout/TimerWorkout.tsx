import { Box, capitalize, CircularProgress, Grid, Typography } from '@mui/material';
import { timeFormat, timerEnds } from '../../../utils';
import React, { FC, useContext, useEffect, useState } from 'react';
import { IWorkoutExerciseDivided } from '../../../interfaces';
import { WorkoutContext } from '../../../context/workout';
import Image from 'mui-image';

interface Props {
  exercise: IWorkoutExerciseDivided;
}

interface Timer {
  minutes: number,
  seconds: number,
  progress: number;
}

const getTime = (exercise: IWorkoutExerciseDivided): Timer => {
  if (exercise.time) {
    const time = timeFormat.numberToTimer(exercise.time)?.split(":");
    const seconds = parseInt(time[2]);
    const minutes = parseInt(time[1]);
    const progress = 100;
    return { seconds, minutes, progress };
  } else {
    return {
      minutes: 0,
      seconds: 0,
      progress: 0
    };
  }
};

export const TimerWorkout: FC<Props> = ({ exercise }) => {
  const [timer, setTimer] = useState<Timer>(getTime(exercise));
  const [timerStarted, setTimerStarted] = useState(false);
  const { updateExerciseTime } = useContext(WorkoutContext);

  useEffect(() => {
    !timerStarted && startTimer();
  }, []);

  useEffect(() => {
    timer.progress <= 0 && timerEnds.handle(true);
    
    const completedTime = timeFormat.timerToNumber(`${timeFormat.format(timer.minutes)}:${timeFormat.format(timer.seconds)}`)
    updateExerciseTime({ ...exercise, completedTime });
    
  }, [timer.progress]);


  const startTimer = () => {
    setTimerStarted(true);
    let minutes = timer.minutes;
    let seconds = timer.seconds;
    let progress = timer.progress;
    const totalProgress = minutes * 60 + seconds;

    let interval = setInterval(() => {
      --seconds;
      progress = (minutes * 60 + seconds) * 100 / totalProgress;
      if (seconds <= 0 && minutes > 0) {
        --minutes;
        seconds = 60;
      }
      setTimer({ minutes, seconds, progress });
      (minutes >= 0 && seconds <= 0) && clearInterval(interval);
    }, 1000);
  };

  return (
    <Grid container spacing={3}
    // justifyContent="center" alignItems="center" width="100%" height="100%"
    >
      {
        exercise.gifUrl && (
          <Grid item xs={12} md={5}>
            <Box sx={{ backgroundColor: 'white' }}>
              <Image
                src={exercise.gifUrl as string}
                alt={exercise.name}
                height="100%"
                width="100%"
                fit="cover"
                easing="ease-in"
                duration={1000}
              />
            </Box>
          </Grid>
        )}
      <Grid item xs={12} md={exercise.gifUrl ? 6 : 12}>
        <Typography
          mt={exercise.gifUrl ? 0 : 5}
          variant="h1"
          component="div"
          color="text.secondary"
          textAlign="center"
        >{capitalize(exercise.name)}</Typography>

        <Box justifyContent="center" mt={exercise.gifUrl ? -2 : 0} mb={5} alignItems="center" width="100%" height="100%" sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" value={timer.progress} sx={{
            margin: 'auto',
            width: { xs: '150px !important', md: '250px !important' },
            height: { xs: '150px !important', md: '250px !important' }
          }} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h1"
              component="div"
              color="text.secondary"
            >{`${timeFormat.format(timer.minutes)}:${timeFormat.format(timer.seconds)}`}</Typography>
          </Box>
        </Box>
      </Grid>

    </Grid>

  );
};
