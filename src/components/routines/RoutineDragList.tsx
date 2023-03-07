import { Box } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { IRoutineCardio, IRoutineRest, IRoutineExercise, IRoutineItemParent, ExerciseType } from '../../../interfaces';
import { RestItem } from './RestItem';
import { RoutineCardioItem } from './RoutineCardioItem';
import { RoutineDragBox } from './RoutineDragBox';
import { RoutineDragItem } from './RoutineDragItem';

interface Props {
  items: IRoutineItemParent[];
  onDragEnd: OnDragEndResponder;
}

export const RoutineDragList: FC<Props> = ({ items, onDragEnd }) => {
  const checkType = (item: IRoutineItemParent, index: number): ReactElement => {
    if(item.itemType === ExerciseType.REST_TYPE) { 
      return <RestItem key={index} index={index} item={item as IRoutineRest} />;
    } else if(item.itemType === ExerciseType.CARDIO_TYPE) { 
      return <RoutineCardioItem item={item as IRoutineCardio} index={index} key={index} />;
    } else {
      const exercise = item as IRoutineExercise;
      return exercise.series?.length > 1 ? <RoutineDragBox item={exercise} index={index} key={index} /> : <RoutineDragItem item={exercise} serie={exercise?.series[0]} index={index} key={index} />;
    }
  };
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {provided => (
          <Box width="100%" ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => ( checkType(item, index) ))}   
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
