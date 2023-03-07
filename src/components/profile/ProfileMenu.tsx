import { AccessibilityNewOutlined, AssignmentOutlined, CalendarMonthOutlined, FitnessCenterOutlined, QueryStatsOutlined } from "@mui/icons-material";
import { Grid, Card, CardContent, Button, CardHeader } from "@mui/material";
import { useRouter } from "next/router";

export const ProfileMenu = () => {

  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <Grid
      item
      xs={12}
    >
      <Card className='fadeIn'>
        <CardHeader title={'Personal Information'} />
        <CardContent>
          <Grid container>

            <Grid item xs={6}sx={{textAlign: 'center'}}>
              <Button 
                size={'large'} 
                variant={'contained'} 
                startIcon={<QueryStatsOutlined />}
                onClick={() => navigateTo('/')}
              >
                Statistics
              </Button>
            </Grid>

            <Grid item xs={6} sx={{textAlign: 'center'}}>
              <Button 
                size={'large'} 
                variant={'contained'} 
                startIcon={<FitnessCenterOutlined />}
                onClick={() => navigateTo('/exercises')}
              >
    	          Exercises
              </Button>
            </Grid>

          </Grid>
        </CardContent>
        <CardContent>
          <Grid container>

            <Grid item xs={6} sx={{textAlign: 'center'}}>
              <Button 
                size={'large'} 
                variant={'contained'} 
                startIcon={<AccessibilityNewOutlined />}
                onClick={() => navigateTo('/')}
              >
                Measures
              </Button>
            </Grid>

            <Grid item xs={6} sx={{textAlign: 'center'}} >
              <Button 
                size={'large'} 
                variant={'contained'} 
                startIcon={<AssignmentOutlined />}
                onClick={() => navigateTo('/')}
              >
                Routines
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
