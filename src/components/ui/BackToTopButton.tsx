import React, { FC } from 'react';
import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';
import { KeyboardArrowUpOutlined } from '@mui/icons-material';

interface Props {
  window?: () => Window;
}

export const BackToTopButton: FC<Props> = ({ window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 100, right: { xs: 20, md: 30 } }}
      >
        <Fab size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpOutlined />
        </Fab>
      </Box>
    </Fade>
  );
};
