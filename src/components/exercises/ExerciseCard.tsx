import { FC, useContext, useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Link, Chip, capitalize, CardContent, Skeleton, Button } from '@mui/material';
import { IExercise } from '../../../interfaces/exercises';
import { CardMenu } from './CardMenu';
import { RoutineContext } from '../../../context/routine';
import { CustomButton } from '../ui';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { IRoutineExercise, IRoutineExerciseDetail } from '../../../interfaces';
import { useRouter } from 'next/router';


interface Props {
  item: IExercise;
}

export const ExerciseCard: FC<Props> = ({ item }) => {
  const { isEditing, routine, addExerciseToRoutine, removeExerciseToRoutine } = useContext(RoutineContext);
  const [ currentRoutine, setCurrentRoutine ] = useState(routine as IRoutineExercise[]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const cardMenu = useRef<any>();
  const { push } = useRouter();

  useEffect(() => {
    setIsImageLoaded(true);
  }, []);

  useEffect(() => {
    setCurrentRoutine(routine as IRoutineExercise[])
  }, [routine])

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
    >
      <Box sx={{ display: isImageLoaded ? 'none' : 'block' }}>
        <Skeleton animation="wave" variant="rectangular" height={120} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} />
      </Box>
      <Card
        className='fadeIn'
        sx={{
          display: isImageLoaded ? 'block' : 'block',
          cursor: 'pointer'
        }}
        onContextMenu={(e) => { e.preventDefault(); !isEditing && cardMenu.current.handleContextMenu(e); }}>
        {
          !isEditing &&
          <CardMenu ref={cardMenu} cardId={item._id as string} />
        }
        <NextLink href={`/exercises/${item._id}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <Chip
                color="secondary"
                label={item.equipment.name}
                sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
              />
              <CardMedia
                component='img'
                className='fadeIn'
                image={item.gifUrl}
                alt={item.name}
              />

            </CardActionArea>
          </Link>
        </NextLink>
        <CardContent>

          <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'block' }} className='fadeIn'>

            <Typography fontWeight={700} sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}>{capitalize(item.name || '')}</Typography>


            <Box display="flex">
              <Typography
                fontWeight={300} sx={{ mr: 1 }}>{capitalize(item.target.name || '')}</Typography>
              <Typography fontWeight={300} sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
              }}>({capitalize(item.target.bodyGroup.name || '')})</Typography>
            </Box>

            {
              isEditing &&
              <Box mt={2}>
                {
                  routine.length > 0 && currentRoutine.some(exercise => exercise.exercise?._id === item._id) ?
                    <CustomButton text='Remove' handleClick={() => removeExerciseToRoutine(item as IExercise)} icon={<RemoveOutlined />} color="warning" />
                    :
                    <CustomButton text='Add' handleClick={() => addExerciseToRoutine(item as IExercise)} icon={<AddOutlined />} />
                }
              </Box>
            }
          </Box>
        </CardContent>
      </Card>


    </Grid>
  );
};
