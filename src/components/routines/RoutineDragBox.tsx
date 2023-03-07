import React, { FC, useContext } from 'react';
import { AddOutlined, ContentCopyOutlined, DeleteOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { Avatar, Box, capitalize, IconButton, ListItemAvatar, ListItemText, TextField, Accordion, AccordionSummary, AccordionDetails, Tooltip } from '@mui/material';
import Image from 'mui-image';
import { Draggable } from 'react-beautiful-dnd';
import { RoutineContext } from '../../../context/routine';
import { IExercise, IRoutineExercise, IRoutineItemParent, ISerie, ITimeSerie } from '../../../interfaces';
import { RoutineDragSubitem } from './RoutineDragSubitem';


interface Props {
  item: IRoutineExercise;
  index: number;
}


export const RoutineDragBox: FC<Props> = ({ item, index }) => {
  // Accordion Handler
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { updateExerciseParams, addExerciseToRoutine, routine, removeExerciseToRoutine, removeDuplicatedExerciseToRoutine } = useContext(RoutineContext);

  const duplicateItem = ($event: any) => {
    $event.stopPropagation();
    const newExercise = { ...item, order: routine.length + 1 };
    addExerciseToRoutine(newExercise.exercise as IExercise, newExercise.series as ITimeSerie[]);
  };

  const deleteItem = () => {
    removeDuplicatedExerciseToRoutine(item as IRoutineExercise);
  };

  const addSerie = ($event: any) => {

    $event.stopPropagation();
    const newExercise = {
      ...item, series: [...item.series as ISerie[], {
        order: item.series[item.series.length - 1].order + 1,
        reps: item.series[item.series.length - 1].reps,
        weight: item.series[item.series.length - 1].weight,
      }]
    };
    updateExerciseParams(newExercise as IRoutineExercise);
  };

  return (
    <Draggable key={item.order?.toString()} draggableId={item.order!.toString()} index={index}>
      {(provided, snapshot) => (
        <Accordion
          expanded={expanded === `panel${item.order}`}
          onChange={handleChange(`panel${item.order}`)}
          disableGutters={true}
          sx={{
            paddingY: 0,
            width: "100%",
            cursor: "move",
            mt: 1,
            mb: 1,
            flexDirection: { xs: "column", md: "row" }
          }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined sx={{ cursor: "pointer" }} />}
            aria-controls={`panel${item.order}bh-content`}
            id={`panel${item.order}bh-header`}

            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between"
            }}

          >
            <Box
              display="flex"
              gap={1}
              width="100%"
              alignItems="center"
              justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <ListItemAvatar sx={{ marginRight: 1 }}>
                  <Avatar>
                    <Image src={item.exercise.gifUrl || ''} alt='' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${capitalize(item.exercise.name)}`} secondary={capitalize(item?.exercise.target?.bodyGroup?.name || '')} />

              </Box>
              <Box justifySelf="flex-end" alignSelf="center" display="flex">
                <TextField
                  sx={{ width: "65px", marginRight: 2, display: { xs: "none", md: "block" } }}
                  type="number"
                  label="Series"
                  disabled
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={item.series?.length} />
                <Tooltip title="Add serie">
                  <IconButton onClick={addSerie} sx={{ width: "50px", height: "50px" }}>
                    <AddOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Duplicate block">
                  <IconButton onClick={duplicateItem} sx={{ width: "50px", height: "50px" }}>
                    <ContentCopyOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete block">
                  <IconButton onClick={deleteItem} sx={{ width: "50px", height: "50px" }}>
                    <DeleteOutlined />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

          </AccordionSummary>
          <AccordionDetails>
            {item.series?.map((serie, index) => (
              <RoutineDragSubitem item={item} serie={serie} key={index} index={index} />
            )
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </Draggable>
  );
};
