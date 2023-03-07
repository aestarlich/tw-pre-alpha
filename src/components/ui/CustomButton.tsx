import React, { FC, ReactElement } from 'react';
import NextLink from 'next/link';
import { Alert, Box, Button, Link, Typography } from '@mui/material';

type color = "inherit" | "warning" | "primary" | "secondary" | "success" | "error" | "info" | undefined;

interface Props {
  text?: string,
  path?: string,
  isNav?: boolean,
  icon?: ReactElement,
  color?: color,
  variant?: "text" | "outlined" | "contained" | undefined,
  handleClick?: () => void;
}

export const CustomButton: FC<Props> = ({ text, icon, path = '/', color = 'primary', isNav = false, handleClick, variant = 'contained' }) => {

  if(!isNav && !handleClick) {
    return <Alert severity="error">Custom Button needs to be setted as Nav Button or a handle method</Alert>
  }

  return (
    <Box
      className="fadeIn">
      {
        isNav
          ?
          <NextLink href={path} passHref>
            <Link>
              <Button sx={{ width: '100%', py: 2 }} color={color} variant={ variant }>
                <>
                  {icon}
                  { text && <Typography fontWeight={700} sx={{ ml: 1 }}>{text}</Typography> }
                </>
              </Button>
            </Link>
          </NextLink>
          :
          <Button sx={{ width: '100%', py: 2, }} color={color} onClick={ handleClick } variant={ variant }>
            <>
              {icon}
              { text && <Typography fontWeight={700} sx={{ ml: 1 }}>{text}</Typography> }
            </>
          </Button>
      }
    </Box>
  );
}
