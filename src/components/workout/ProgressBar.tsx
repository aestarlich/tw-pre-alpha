import React, { FC } from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import { LinearProgressProps } from '@mui/material/LinearProgress';

export const ProgressBar: FC<any> = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        props.value,
      )}%`}</Typography>
    </Box>
  </Box>
  )
}
