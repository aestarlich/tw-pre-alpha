import React, { FC } from 'react';
import NextLink from 'next/link';
import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

interface Props {
  url: string,
  img: string,
  title: string
}

export const IndexCard: FC<Props> = ({ url, img, title }) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      xl={12}
    >
      <Card className='fadeIn'>
        <NextLink href={url} passHref prefetch={false}>
          <Link>
            <CardActionArea sx={{ height: { 
              xs: 'calc(30vh - 50px)', 
              md: 'calc(100vh - 185px)',
              xl: 'calc(30vh - 50px)',
            }}}>
              <CardMedia
                component='img'
                className='fadeIn'
                image={`/img/${img}.jpg`}
                alt={title}
                sx={{ height: '100%', objectFit: "full", objectPosition: 'center center' }}
              />
              <Box sx={{
                position: 'absolute',
                background: 'linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.8) 100%)',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'block',
              }}></Box>
              <Typography
                color="#FFF"
                sx={{
                  position: 'absolute',
                  zIndex: 99,
                  bottom: '20px',
                  left: '20px'
                }}
                variant={'h2'}
                fontWeight={800}>{title}</Typography>
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>
    </Grid>
  );
};
