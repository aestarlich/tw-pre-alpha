import { FC, useEffect, useRef, useState } from 'react';
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Chip, capitalize, CardContent, Skeleton, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardMenu } from './CardMenu';
import { IRoutine } from '../../../interfaces';
import { DeleteRoutineDialog } from '.';
interface Props {
  item: IRoutine;
}

export const RoutineCard: FC<Props> = ({ item }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const cardMenu = useRef<any>();

  useEffect(() => {
    setIsImageLoaded(true);
  }, []);

  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{margin: 2}}
    >
      <Box sx={{ display: isImageLoaded ? 'none' : 'block' }}>
        <Skeleton animation="wave" variant="rectangular" height={120} />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.5rem' }} />
      </Box>

      <Card
        // onClick={() => push(`/routines/${item._id}`)}
        className='fadeIn'
        sx={{
          display: isImageLoaded ? 'block' : 'block',
          cursor: 'pointer'
        }}
        onContextMenu={(e) => { e.preventDefault(); cardMenu.current.handleContextMenu(e); }}>
        {
          <CardMenu deleteItemDialog={(open: boolean) => setOpenDeleteDialog(open)} ref={cardMenu} item={item as IRoutine} />
        }
        <CardActionArea>

          <CardMedia
            component='img'
            className='fadeIn'
            image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0zKknEf_ExsMDMYCkGnkF4bvK-dRrBJb9FdYBJOO0vy5H15IsJSpMBSlVDz7bt6BKCk&usqp=CAU'}
            alt={item.name}
          />

        </CardActionArea>
        <CardContent>

          <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'block' }} className='fadeIn'>

            <Typography fontWeight={700} sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}>{capitalize(item.name || '')}</Typography>

            <Box display="flex">
              <Typography
                fontWeight={300} sx={{ mr: 1 }}>{capitalize(item.needsEquipment ? 'Needs equipment' : 'No equipment needed')}</Typography>
            </Box>
            <Box display="flex" mt={2} flexWrap="wrap" sx={{justifyContent: 'space-between'}}>
              <div>
                {
                  item.bodyGroups?.map(bodyGroup => (
                    <Chip
                      key={bodyGroup?._id}
                      color="primary"
                      label={capitalize(bodyGroup?.name || '')}
                      sx={{ marginRight: '10px', marginBottom: '10px' }}
                    />
                  ))
                }
              </div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-haspopup="true"
                onClick={(e) => { e.preventDefault(); cardMenu.current.handleContextMenu(e); }}
                sx={{ float: 'right' }}
              >
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <DeleteRoutineDialog setOpenDialog={(open: boolean) => setOpenDeleteDialog(open)} id={item._id as string} name={item.name} openDialog={openDeleteDialog} />
    </Grid>
  );
};
