import React, { FC, useContext, useEffect } from 'react';
import { ContentCopyOutlined, DeleteOutlined } from '@mui/icons-material';
import Image from 'mui-image';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Avatar, Box, capitalize, IconButton, ListItemAvatar, ListItemText, Paper, TextField, Tooltip } from '@mui/material';
import { IRoutineCardio, IExercise, IRoutineItemParent } from '../../../interfaces';
import { RoutineContext } from '../../../context/routine';
import { Draggable } from 'react-beautiful-dnd';
import { timeFormat } from '../../../utils';

interface Props {
  item: IRoutineCardio;
  index: number;
}

export const RoutineCardioItem: FC<Props> = ({ item, index }) => {
  // const [value, setValue] = React.useState<Dayjs>(dayjs(`0000-00-00T00:${item.series[0]?.time}`));
  const [value, setValue] = React.useState<Dayjs>(dayjs(timeFormat.numberToTimer(item.series[0].time)));
  const { updateExerciseParams, addExerciseToRoutine, removeExerciseToRoutine, routine, removeDuplicatedExerciseToRoutine } = useContext(RoutineContext);
  useEffect(() => {
    let newTime = `${value?.minute()}:${value?.second()}`;
    if(newTime === "0:0" || newTime === "undefined:undefined" || newTime === "NaN:NaN") {
      newTime = "00:30";
      setValue(dayjs(`0000-00-00T00:${newTime}`));
    }

    const series = item.series.map(serie => {
      return { ...serie, time: timeFormat.timerToNumber(newTime) }
    })

    const updatedItem = { ...item, series };
    updateExerciseParams(updatedItem);

  }, [value]);

  const duplicateItem = () => {
    addExerciseToRoutine(item.exercise as IExercise, item.series);
  };

  const deleteItem = () => {
    removeDuplicatedExerciseToRoutine(item as IRoutineItemParent);
  };

  return (
    <Draggable key={item.order?.toString()} draggableId={item.order!.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <Paper
            sx={{
              padding: 2,
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              cursor: "move",
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
              <ListItemAvatar sx={{ alignItems: "center" }}>
                <Avatar>
                  <Box sx={{backgroundColor: 'white'}}>
                    <Image src={item.exercise.gifUrl || ''} alt='' />
                  </Box>
                </Avatar>
              </ListItemAvatar>
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
                width: { xs: "100%", md: "50%" }, marginTop: { xs: 2, md: 0 }
              }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  ampm={false}
                  openTo="minutes"
                  views={['minutes', 'seconds']}
                  inputFormat="mm:ss"
                  mask="__:__"
                  label="Duration"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue!);
                  } }
                  renderInput={(params) => <TextField sx={{ width: "100%" }} {...params} />} />
              </LocalizationProvider>

              <Box alignSelf="center" sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Duplicate rest time">
                  <IconButton onClick={duplicateItem} sx={{ width: "50px", height: "50px" }}>
                    <ContentCopyOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete rest time">
                  <IconButton onClick={deleteItem} sx={{ width: "50px", height: "50px" }}>
                    <DeleteOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        );
      }}
    </Draggable>

  );
};
