import { useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { Typography, Box } from '@mui/material';
import { MainLayout } from '../../../layouts';
import { ExerciseGrid, SearchForm } from '../../../components/exercises';
import { defaultParams, IBodyGroup, IExercise, ISearchBody } from '../../../../interfaces';
import { dbExercises, GET_EXERCISE_LIST, GET_EXERCISE_LIST_WITH_FILTER } from '../../../../axiosApi';
import { useLoadingExercises, useSearch } from '../../../../hooks';
import { FullScreenLoading } from '../../../components/ui';
import { useRouter } from 'next/router';

interface Props {
  prevItems: IExercise[];
  availableBodyGroups: IBodyGroup[],
  foundItems: boolean;
  prevTotalCount: number;
  query: string;
}

const defaultBodySearch: ISearchBody = {
  name: '',
  bodyGroups: [],
  noEquipement: false
};

const SearchPage: NextPage<Props> = ({ prevItems, foundItems, prevTotalCount, availableBodyGroups }) => {
  const { items: exercises, totalCount, isLoading: loadingExercises } = useLoadingExercises(GET_EXERCISE_LIST, defaultParams);
  const {newSearch, setUrl, setSearchData, searchData, handleSearch, setBody, isLoading} = useSearch();
  const { query } = useRouter();

  useEffect(() => {
    const initQuery = query.query as string;
    setSearchData({
      items: prevItems,
      totalCount: prevTotalCount
    });

    setBody({...defaultBodySearch});

    setUrl(GET_EXERCISE_LIST_WITH_FILTER);
    if(initQuery) newSearch(true, {...defaultBodySearch, name: initQuery});
  }, [loadingExercises, exercises]);
  

  return (
    <MainLayout title={'TheWorkout - Search'} pageDescription={'Find Exercises here'}>
      <SearchForm defaultName={query.query as string} handleNewSearch={newSearch} />
      {
        searchData.items?.length > 0 ?
        <ExerciseGrid items={searchData.items || exercises} total={searchData.totalCount || totalCount} handleLoad={() => handleSearch(false)} />
        : (
          <Box display='flex' height={200} justifyContent='center' alignItems='center'>
            <Typography variant='h1' sx={{ mb: 1 }}>Any results founded </Typography>
          </Box>
        )
      }

    </MainLayout >
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//   const { query = '' } = params as { query: string };

//   if (query.length === 0) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: true
//       }
//     };
//   }

//   const { items, totalCount } = await dbExercises.getExercisesByTerm(query);
//   const availableBodyGroups = await dbExercises.getBodyGroups() as IBodyGroup[];
//   const foundItems = totalCount > 0;

//   return {
//     props: {
//       availableBodyGroups,
//       prevItems: items,
//       foundItems,
//       prevTotalCount: totalCount,
//       query
//     }
//   };
// };


export default SearchPage;
