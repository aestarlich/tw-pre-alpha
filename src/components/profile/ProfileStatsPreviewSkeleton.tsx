import { Grid, Card, CardHeader, CardContent, Skeleton } from "@mui/material";

export const ProfileStatsPreviewSkeleton = () => {
  return (
    <Grid
      item
      xs={12}
    >
      <Card className='fadeIn'>
        <CardHeader title={<Skeleton variant="text" />} />
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
