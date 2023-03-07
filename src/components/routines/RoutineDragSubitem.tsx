import { ContentCopyOutlined, DeleteOutlined } from '@mui/icons-material';
import { Box, capitalize, IconButton, ListItemText, Paper, TextField, Tooltip } from '@mui/material';
import React, { FC, useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RoutineContext } from '../../../context/routine';
import { IRoutineRest, IRoutineExercise, ISerie, IRoutineCardio, IEquipment, IExercise } from '../../../interfaces';


interface Props {
  item: IRoutineExercise | IRoutineCardio;
  serie: ISerie;
  index: number;
}


export const RoutineDragSubitem: FC<Props> = ({ item, serie, index }) => {
  const { updateExerciseParams } = useContext(RoutineContext);
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
    const newExercise = { ...item, series: item.series!.map(filteredSerie => filteredSerie.order === serie.order ? newSerie : filteredSerie) };

    updateExerciseParams(newExercise as IRoutineExercise);
  };

  const duplicateItem = () => {
    const newSerie = { ...serie, order: item.series!.length + 1 };
    const newExercise = { ...item, series: [...item.series!, newSerie] };
    updateExerciseParams(newExercise as IRoutineExercise);
  };

  const deleteItem = () => {
    const series = item.series!.filter(filteredSerie => serie.order !== filteredSerie.order);

    const newExercise = { ...item, series: series.map((serie, index) => ({ ...serie, order: index + 1 })) };

    updateExerciseParams(newExercise as IRoutineExercise);
  };

  return (

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
    >


      <Box
        display="flex"
        gap={1}
        alignItems="center"
        justifyContent="flex-end"
        sx={{ width: { md: "50%" } }}>
        {/* <ListItemAvatar>
          <Avatar>
            <Image src={item.gifUrl || ''} />
          </Avatar>
        </ListItemAvatar> */}
        <ListItemText primary={`${capitalize(item.exercise.name)}`} secondary={capitalize(item?.exercise.target?.bodyGroup?.name || '')} />
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
        <Tooltip title="Duplicate serie">
          <IconButton onClick={duplicateItem} sx={{ width: "50px", height: "50px" }}>
            <ContentCopyOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete serie">
          <IconButton onClick={deleteItem} sx={{ width: "50px", height: "50px" }}>
            <DeleteOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};
