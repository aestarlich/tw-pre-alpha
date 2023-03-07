import React, { FC, useContext, useEffect } from 'react';
import { AccessTimeOutlined, ContentCopyOutlined, DeleteOutlined } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, IconButton, ListItemAvatar, ListItemText, Paper, TextField, Tooltip } from '@mui/material';
import { IRoutineItemParent, IRoutineRest } from '../../../interfaces';
import { RoutineContext } from '../../../context/routine';
import { Draggable } from 'react-beautiful-dnd';
import { timeFormat } from '../../../utils';

interface Props {
  item: IRoutineRest;
  index: number;
}

export const RestItem: FC<Props> = ({ item, index }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(timeFormat.numberToTimer(item.time)));
  const { updateExerciseParams, removeDuplicatedExerciseToRoutine, routine, addRestToRoutine } = useContext(RoutineContext);
  useEffect(() => {
    let newTime = `${value?.minute()}:${value?.second()}`;
    if(newTime === "0:0" || newTime === "undefined:undefined" || newTime === "NaN:NaN") {
      newTime = "01:00";
      setValue(dayjs(`0000-00-00T00:${newTime}`));
    }
    const updatedItem = { ...item, time: timeFormat.timerToNumber(newTime) };
    updateExerciseParams(updatedItem as IRoutineItemParent);
  }, [value]);

  const duplicateItem = () => {
    addRestToRoutine({ ...item, order: routine.length + 1 });
  };

  const deleteItem = () => {
    removeDuplicatedExerciseToRoutine(item as IRoutineItemParent);
  };

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
              <AccessTimeOutlined sx={{ height: "50px", width: "50px", marginTop: 0.5 }} />
            </ListItemAvatar>
            <ListItemText primary={`Rest time`} />
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
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField sx={{ width: "100%" }} {...params} />}
              />
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
      )}
    </Draggable>

  );
};
