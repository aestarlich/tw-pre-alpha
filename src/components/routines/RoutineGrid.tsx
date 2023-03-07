import { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { RoutineCard } from '.';
import { IRoutine } from '../../../interfaces';
interface Props {
  items: IRoutine[];
  total: number
}

export const RoutineGrid: FC<Props> = ({ items, total }) => {

  return (
    <Grid container spacing={4}>
      {
        items.map(item => (
          <RoutineCard
            key={item._id}
            item={item}
          />
        ))
      }
    </Grid>
  );
};
