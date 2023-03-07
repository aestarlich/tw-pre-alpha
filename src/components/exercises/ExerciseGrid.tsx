import { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ExerciseCard } from '.';
import { IExercise } from '../../../interfaces/exercises';
import InfiniteScroll from 'react-infinite-scroller';
import { FullScreenLoading } from '../ui';
interface Props {
  items: IExercise[];
  total: number,
  handleLoad: () => void;
}

export const ExerciseGrid: FC<Props> = ({ items, handleLoad, total }) => {
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(total > items.length ? true : false);
  }, [items, total]);

  return (

    <InfiniteScroll
      loadMore={handleLoad}
      hasMore={hasMore}
      initialLoad={false}
      loader={<FullScreenLoading key={0} />}
    >
      <Grid container spacing={4}>
        {
          items.map(item => (
            <ExerciseCard
              key={item._id}
              item={item}
            />
          ))
        }
      </Grid>
    </InfiniteScroll>
  );
};
