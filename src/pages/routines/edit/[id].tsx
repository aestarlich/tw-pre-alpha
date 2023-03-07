import React, { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import {  GET_BODYGROUP_LIST, GET_EXERCISE_LIST, GET_EXERCISE_LIST_WITH_FILTER, gymApi } from '../../../../axiosApi';
import { RoutineContext } from '../../../../context/routine';
import { useLoadingBodyGroups, useLoadingExercises, useSearch } from '../../../../hooks';
import { defaultParams, IBodyGroup, IExercise, ISearchBody } from '../../../../interfaces';
import { ExerciseGrid, SearchForm } from '../../../components/exercises';
import { EditionLayout } from '../../../layouts';

interface Props {
  prevItems: IExercise[];
  prevTotalCount: number;
  availableBodyGroups: IBodyGroup[];
  foundItems: boolean;
}

const defaultBodySearch: ISearchBody = {
  name: '',
  bodyGroups: [],
  noEquipement: false,
};

const EditRoutineExercisePage: NextPage<Props> = ({ prevItems, prevTotalCount, availableBodyGroups, foundItems = true }) => {
  const { name, startRoutineEdition } = useContext(RoutineContext);
  const { items: exercises, totalCount, isLoading: loadingExercises } = useLoadingExercises(GET_EXERCISE_LIST, defaultParams);
  const { newSearch, setUrl, setSearchData, searchData, handleSearch, setBody } = useSearch();

  useEffect(() => {
    
    startRoutineEdition();
    setSearchData({
      items: exercises,
      totalCount: totalCount
    });
    setBody({...defaultBodySearch});
    setUrl(GET_EXERCISE_LIST_WITH_FILTER);
  }, [loadingExercises, exercises]);

  return (
    <EditionLayout title={'Routines - Edit routine exercises'} pageDescription={''}>
      <Typography variant='h1'>{name}</Typography>
      <SearchForm defaultName={''} handleNewSearch={newSearch} />

      {
        !foundItems || searchData?.items?.length <= 0
        && (
          <Box display='flex' height={200} justifyContent='center' alignItems='center'>
            <Typography variant='h1' sx={{ mb: 1 }}>Any results founded </Typography>
          </Box>
        )
      }

      <ExerciseGrid items={searchData.items || exercises} total={searchData.totalCount || totalCount} handleLoad={() => handleSearch(false)} />

    </EditionLayout>
  );
};

// EditRoutineExercisePage.getInitialProps = async () => {
  // const { data } = await gymApi.get(GET_EXERCISE_LIST);
  // const { data: bodyGroupsData} = await gymApi.get(GET_BODYGROUP_LIST);
  // const foundItems = data.totalCount > 0;
//   return {
//     prevItems: [],
//     prevTotalCount: 100,
//     availableBodyGroups: [],
//     foundItems: true
//   };
// };

export default EditRoutineExercisePage;