import { Card, CardContent, Grid, Skeleton } from "@mui/material";

export const ProfileCardSkeleton = () => {
  return (
    <Grid
      item
      xs={12}
    >
      <Card className='fadeIn'>

        <CardContent
          sx={{
            display: 'flex', 
            flexDirection: 'row', 
            alignContent: 'space-between', 
            alignItems: 'center'
          }}
        >
          <Skeleton variant="circular" width={56} height={56} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', marginLeft: 3, width: '50%' }} />
        </CardContent>

        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        </CardContent>

      </Card>
    </Grid>
  );
};
