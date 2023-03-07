import { Grid, Card, CardHeader, CardContent, Skeleton } from "@mui/material";

export const ProfileMenuSkeleton = () => {
  return(
    
    <Grid
      item
      xs={12}
    >
      <Card className='fadeIn'>
        <CardHeader title={<Skeleton variant='text' />} />
        <CardContent>
          <Grid container spacing={2}>

            <Grid item xs={6}sx={{textAlign: 'center'}}>
              <Skeleton variant='rounded' height={50}/>
            </Grid>

            <Grid item xs={6} sx={{textAlign: 'center'}}>
              <Skeleton variant='rounded' height={50} />
            </Grid>

          </Grid>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>

            <Grid item xs={6} sx={{textAlign: 'center'}}>
              <Skeleton variant='rounded' height={50}/>
            </Grid>

            <Grid item xs={6} sx={{textAlign: 'center'}} >
              <Skeleton variant='rounded' height={50}/>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
