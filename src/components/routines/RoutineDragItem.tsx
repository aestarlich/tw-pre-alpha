import { AddOutlined, ContentCopyOutlined, DeleteOutlined } from '@mui/icons-material';
import { Avatar, Box, capitalize, IconButton, ListItemAvatar, ListItemText, Paper, TextField, Tooltip } from '@mui/material';
import Image from 'mui-image';
import React, { FC, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Controller, useForm } from 'react-hook-form';
import { RoutineContext } from '../../../context/routine';
import { IRoutineRest, IRoutineExercise, ISerie, IExercise, IRoutineItemParent, ITimeSerie } from '../../../interfaces';


interface Props {
  item: IRoutineExercise;
  serie: ISerie;
  index: number;
}

export const RoutineDragItem: FC<Props> = ({ item, serie, index }) => {
  const { updateExerciseParams, addExerciseToRoutine, routine, removeDuplicatedExerciseToRoutine } = useContext(RoutineContext);
  const { getValues, control } = useForm<ISerie>({
    defaultValues: {
      reps: serie.reps || 10,
      weight: serie.weight || 10,
    }
  });

  const onValueChange = () => {
    const newSerie = {
      ...serie,
      reps: parseInt(getValues('reps') as any),
      weight: parseInt(getValues('weight') as any)
    };
    const newExercise = { ...item, series: [newSerie] };

    updateExerciseParams(newExercise as IRoutineExercise);
  };

  const duplicateItem = () => {
    addExerciseToRoutine(item.exercise as IExercise, item.series as ITimeSerie[]);
  };

  const deleteItem = () => {
    removeDuplicatedExerciseToRoutine(item as IRoutineItemParent);
  };

  const addSerie = () => {
    const newExercise = {
      ...item, 
      series: [...item.series as ISerie[], {
        order: item.series![item.series!.length - 1].order + 1,
        reps: item.series![item.series!.length - 1].reps,
        weight: item.series![item.series!.length - 1].weight,
      }]
    };

    updateExerciseParams(newExercise as IRoutineExercise);
  };

  console.log();
  

  return (
    <Draggable key={item.order?.toString()} draggableId={item.order!.toString()} index={index}>
      {(provided, snapshot) => (
        <Paper
          sx={{
            padding: 2,
            width: "100%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            cursor: "move",
            zIndex: 9999,
            mt: 1,
            mb: 1,
            flexDirection: { xs: "column", md: "row" }
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >

          <Box
            display="flex"
            gap={1}
            alignItems="center"
            justifyContent="flex-end"
            sx={{ width: { md: "50%" } }}>
            <ListItemAvatar>
              <Avatar>
                <Image src={item.exercise.gifUrl || ''} alt='' />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${capitalize(item.exercise.name)}`} secondary={capitalize(item.exercise.target?.bodyGroup?.name || '')} />
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={addSerie} sx={{ width: "50px", height: "50px" }}>
                <AddOutlined />
              </IconButton>
              <IconButton onClick={duplicateItem} sx={{ width: "50px", height: "50px" }}>
                <ContentCopyOutlined />
              </IconButton>
              <IconButton onClick={deleteItem} sx={{ width: "50px", height: "50px" }}>
                <DeleteOutlined />
              </IconButton>
            </Box>
          </Box>
          <Box
            display="flex"
            alignSelf="center"
            justifyContent="flex-end"
            gap={1}
            sx={{
              width: { xs: "100%", md: "50%" }, marginTop: { xs: 2, md: 0 }, marginRight: 2
            }}>
            <form style={{ display: "flex", gap: 5 }} onChange={onValueChange}>
              <Controller
                control={control}
                name="reps"
                render={({ field: { onChange, name, ref } }) => (
                  <TextField
                    type="number"
                    label="Reps"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={serie.reps || 10}
                    onChange={onChange} />
                )}
              />
              <Controller
                control={control}
                name="weight"
                render={({ field: { onChange, name, ref } }) => (
                  <TextField
                    type="number"
                    label="Weight"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    value={serie.weight || 10}
                    onChange={onChange} />
                )}
              />
            </form>
          </Box>


          <Box alignSelf="center" sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title={"Add serie"}>
              <IconButton onClick={addSerie} sx={{ width: "50px", height: "50px" }}>
                <AddOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Duplicate exercise"}>
              <IconButton onClick={duplicateItem} sx={{ width: "50px", height: "50px" }}>
                <ContentCopyOutlined />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Delete exercise"}>
              <IconButton onClick={deleteItem} sx={{ width: "50px", height: "50px" }}>
                <DeleteOutlined />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      )}
    </Draggable>
  );
};
