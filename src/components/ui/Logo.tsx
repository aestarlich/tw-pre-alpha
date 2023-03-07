import NextLink from 'next/link';
import { Box, Link } from '@mui/material';
import Image from 'mui-image';

export const Logo = () => {
  return (
    <NextLink href='/' passHref>
      <Link alignItems='center' sx={{ width: 'fit-content'}} className='logo'>
        <Box sx={{ maxWidth: "150px", display: { xs: "none", md: "flex"} }}>
          <img style={{ maxWidth: "100%", opacity: 100 }} src="/img/logo/logo_theworkout.png" alt='TheWorkout' />
        </Box>
        <Box sx={{ maxWidth: "50px", display: { xs: "flex", md: "none"} }}>
          <img style={{ maxWidth: "100%", opacity: 100 }} src="/img/logo/favicon_theworkout.png" alt='TheWorkout' />
        </Box>
      </Link>
    </NextLink>
  );
};