import { Box, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  isFull?: boolean;
}

export const FullScreenLoading: FC<Props> = ({ isFull = false }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      height={isFull ? 'calc(100vh - 200px)' : '200px'}
    >
      <Typography sx={{ mb: 3 }} variant="h2" fontWeight={200} fontSize={20}>Loading...</Typography>
      <CircularProgress thickness={2} />
    </Box>
  );
}
