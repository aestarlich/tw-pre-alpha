import { Grid, Card, CardHeader, CardContent, Skeleton } from "@mui/material";

export const ProfileStatsPreview = () => {
  return (
    <Grid
      item
      xs={12}
    >
      <Card className='fadeIn'>
        <CardHeader title={'Stats Preview'} />
        <CardContent>
          <Skeleton 
            variant="rounded"
            width='100%'
            height={200}
          >
          </Skeleton>
        </CardContent>
      </Card>
    </Grid>
  );
};
