import React, { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { Box, Fab, TextField, Typography } from '@mui/material';
import { MainLayout } from '../../layouts';
import { IRoutineRest, IRoutine, ExerciseType, IRoutineItemParent } from '../../../interfaces';
import { RoutineDragList } from '../../components/routines';
import { DropResult } from 'react-beautiful-dnd';
import { RoutineContext } from '../../../context/routine';
import { CustomButton, FullScreenLoading } from '../../components/ui';
import { AddOutlined, MoreTimeOutlined, SaveOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { UiContext } from '../../../context';
import { useGetDetail } from '../../../hooks';
import { basicTimerNumber } from '../../../utils/format-time';

interface RoutineLoaded { item: IRoutine, isLoading: boolean; }

const RoutineDetailPage: NextPage = () => {
  const { query } = useRouter();
  const { item, isLoading } = useGetDetail("/routines", query.id as string) as RoutineLoaded;
  const { getValues, control } = useForm<IRoutine>({
    defaultValues: {
      name: item?.name
    }
  });
  const { setRoutineInContext, finishRoutineEdition, routine, changeRoutineName, addRestToRoutine, finishEditRoutine } = useContext(RoutineContext);
  const { handleAlertMessage } = useContext(UiContext);
  const { push } = useRouter();
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(routine, source.index, destination.index);
    const routineReordered = { ...item, routine: newItems };
    setRoutineInContext(routineReordered as IRoutine);
  };

  const addNewRestToRoutine = () => {
    const newRest: IRoutineRest = {
      time: basicTimerNumber,
      order: routine.length + 1,
      itemType: ExerciseType.REST_TYPE
    };

    addRestToRoutine(newRest);
  };

  const finishRoutine = async () => {
    const resp = await finishRoutineEdition(true, item._id as string);
    resp.status !== 200 ? 
    handleAlertMessage({ alertMessage: resp.data, displayAlert: true, severity: "error" }) : 
    handleAlertMessage({ alertMessage: resp.data, displayAlert: true, severity: "success" }); finishEditRoutine(); push('/routines');
  };

  const addExercisesToTraining = async () => {
    const resp = await finishRoutineEdition(true, item._id as string);
    if (resp.status !== 200) {
      handleAlertMessage({ alertMessage: resp.data, displayAlert: true, severity: "error" });
    } else {
      push(`/routines/edit/${item._id}`);
    }
  };

  useEffect(() => {
    if (item !== undefined) {
      setRoutineInContext(item);
    }
    
  }, [item]);

  const reorder = (list: IRoutineItemParent[], startIndex: number, endIndex: number): IRoutineItemParent[] => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    result = result.map((item, index) => { return { ...item, order: index + 1 }; });

    return result;
  };

  return (
    <MainLayout title={'TheWorkout - Routines'} pageDescription={''}>
      {
        item && (
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, name, ref } }) => (
              <TextField
                fullWidth
                type="text"
                defaultValue={item?.name || ''}
                onChange={(data) => changeRoutineName(data.target.value)}
                variant="standard" />
            )}
          />
        )
      }
      {
        isLoading && <FullScreenLoading />
      }
      {
        (!isLoading && routine.length > 0) && (
          <>
            <Box
              gap={2}
              flexDirection="column"
              mt={2}
              sx={{
                display: { xs: 'flex', md: 'none' }
              }}
            >
              <Fab sx={{
                display: { xs: 'flex', md: 'none' },
                position: 'fixed',
                left: '25px',
                bottom: "100px"
              }}
                onClick={addExercisesToTraining} color='warning'><AddOutlined /></Fab>
              <Fab sx={{
                display: { xs: 'flex', md: 'none' },
                position: 'fixed',
                left: '25px',
                bottom: "25px",
              }}
                onClick={addNewRestToRoutine} ><MoreTimeOutlined /></Fab>
              <CustomButton icon={<SaveOutlined />} text='Save changes' handleClick={finishRoutine} />
            </Box>

            <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap' }}>
              <RoutineDragList items={routine || item.routine} onDragEnd={onDragEnd} />
            </Box>
            <Box gap={2} mt={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <CustomButton icon={<MoreTimeOutlined />} text='Add rest to training' variant='outlined' handleClick={addNewRestToRoutine} />
              <CustomButton color="warning" icon={<AddOutlined />} text='Add exercises to training' variant='outlined' handleClick={addExercisesToTraining} />
              <CustomButton icon={<SaveOutlined />} text='Save routine changes' handleClick={finishRoutine} />
            </Box>
          </>
        )
      }

      {
        (!isLoading && item?.routine.length <= 0) && (
          <>
            <Typography variant='h1' component='h1' display='flex' justifyContent='center' alignItems='center' height={200}>{"This routine don't have exercises yet"}</Typography>

            <Box gap={2} display="flex" flexDirection="column">
              <CustomButton text='Add exercises to training' variant='outlined' handleClick={addExercisesToTraining} />
              <CustomButton text='Save routine changes' handleClick={finishRoutine} />
            </Box>
          </>
        )
      }
    </MainLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   const {id = ''} = params as {id: string };
//   const routine = await dbRoutines.getRoutineDetail(undefined, undefined, id);
//   return {
//     props: {
//       routine
//     }
//   }
// }

export default RoutineDetailPage;